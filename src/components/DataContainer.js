import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hasNextPage, createDataArray } from '@entria/relay-utils';

import InfiniteScroll from './InfiniteScroll';
import Table from './Table';
import LoadMore from './LoadMore';

class DataContainer extends Component {
  state = {
    loading: this.props.loading,
    variables: this.props.variables,
    count: this.props.variables.first,
    checked: this.props.checkboxes.checked,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: nextProps.loading,
    });
  }

  loadMore() {
    const { variables, count } = this.state;

    const options = {
      ...variables,
      first: variables.first + count,
    };

    this.setState({
      loading: true,
      variables: options,
    });

    this.props.relay.refetch(options, null, () => {
      this.setState({
        loading: false,
      });
    });
  }

  handleScroll() {
    const { loading } = this.state;

    if (hasNextPage(this.props) && !loading) {
      this.loadMore();
    }
  }

  prepareProps() {
    const { table, checkboxes } = this.props;
    const { loading } = this.state;
    const data = createDataArray(this.props);

    return {
      config: {
        table,
        checkboxes,
      },
      loading,
      data,
      hasNextPage: data.length > 0 && hasNextPage(this.props),
    };
  }

  render() {
    const preparedProps = this.prepareProps();

    return (
      <InfiniteScroll onScroll={() => this.handleScroll()}>
        <div>
          <Table {...preparedProps} />

          <LoadMore
            onClick={() => this.loadMore()}
            label={preparedProps.loading ? 'Carregando...' : 'Carregar mais'}
            disabled={preparedProps.loading}
            visible={preparedProps.hasNextPage}
          />
        </div>
      </InfiniteScroll>
    );
  }
}

DataContainer.defaultProps = {
  loading: false,
  variables: {},
  table: {
    columns: [],
    cellRender: null,
  },
  checkboxes: {
    component: null,
    onCheck: null,
    checked: [],
  },
};

DataContainer.propTypes = {
  loading: PropTypes.bool,
  variables: PropTypes.object,
  table: PropTypes.shape({
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        property: PropTypes.string,
        render: PropTypes.func,
      }),
    ),
    cellRender: PropTypes.func,
  }),
  checkboxes: PropTypes.shape({
    component: PropTypes.any,
    onCheck: PropTypes.func,
    checked: PropTypes.array,
  }),
};

export default DataContainer;
