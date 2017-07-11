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

  render() {
    const { table } = this.props;
    const { loading } = this.state;

    const data = createDataArray(this.props);

    return (
      <InfiniteScroll onScroll={() => this.handleScroll()}>
        <div>
          <Table {...table} data={data} loading={loading} />

          <LoadMore
            onClick={() => this.loadMore()}
            label={loading ? 'Carregando...' : 'Carregar mais'}
            disabled={loading}
            visible={data.length > 0 && hasNextPage(this.props)}
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
    checkboxes: {},
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
    ).isRequired,
    cellRender: PropTypes.func,
    checkboxes: PropTypes.shape({
      store: PropTypes.string.isRequired,
      component: PropTypes.any.isRequired,
    }),
  }),
};

export default DataContainer;
