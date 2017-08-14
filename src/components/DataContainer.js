import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hasNextPage, createDataArray } from '@entria/relay-utils';
import { InfiniteScroll } from '@entria/utils';

import Table from './Table';
import LoadMore from './LoadMore';

class DataContainer extends Component {
  state = {
    loading: this.props.loading,
    variables: this.props.variables,
    count: this.props.variables.first,
    checked: this.props.checkboxes.checked || [],
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: nextProps.loading,
    });
  }

  fetchMore = (params = {}) => {
    const count = params.count || this.state.count;
    const { variables } = this.state;

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

      if (params.onComplete) {
        params.onComplete();
      }
    });
  };

  fetchAll = (params = {}) => {
    const count = params.count || 100;
    const { list } = this.props;
    const data = createDataArray(this.props, list);

    if (params.onFetch) {
      params.onFetch(data);
    }
    if (!hasNextPage(this.props) && params.onComplete) {
      return params.onComplete(data);
    }

    this.fetchMore({
      count,
      onComplete: () => this.fetchAll(params),
    });
  };

  checkAll = () => {
    this.fetchAll({
      onFetch: data => {
        this.setState({
          checked: data,
        });
      },
      onComplete: data => {
        this.setState({
          checked: data,
        });

        this.props.checkboxes.onChange(data);
      },
    });
  };

  uncheckAll = () => {
    const checked = [];

    this.setState({
      checked,
    });

    this.props.checkboxes.onChange(checked);
  };

  check = item => {
    const checked = [...this.state.checked, item];

    this.setState({
      checked,
    });

    this.props.checkboxes.onChange(checked);
  };

  uncheck = item => {
    const checked = this.state.checked.filter(selectedItem => selectedItem.id !== item.id);

    this.setState({
      checked,
    });

    this.props.checkboxes.onChange(checked);
  };

  isChecked = item =>
    this.state.checked.filter(selectedItem => selectedItem.id === item.id).length > 0;

  handleScroll = () => {
    const { loading } = this.state;

    if (hasNextPage(this.props) && !loading) {
      this.fetchMore();
    }
  };

  prepareProps = () => {
    const { table, checkboxes, list } = this.props;
    const { loading, checked } = this.state;
    const data = createDataArray(this.props, list);

    return {
      config: {
        table,
        checkboxes,
      },
      actions: {
        checkAll: () => this.checkAll(),
        uncheckAll: () => this.uncheckAll(),
        check: item => this.check(item),
        uncheck: item => this.uncheck(item),
        isChecked: item => this.isChecked(item),
      },
      loading,
      data,
      hasNextPage: data.length > 0 && hasNextPage(this.props),
      checked,
    };
  };

  render() {
    const preparedProps = this.prepareProps();

    return (
      <InfiniteScroll onScroll={() => this.handleScroll()}>
        <div>
          <Table {...preparedProps} />

          <LoadMore
            onClick={() => this.fetchMore()}
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
    onChange: null,
    checked: [],
  },
};

DataContainer.propTypes = {
  list: PropTypes.string.isRequired,
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
    onChange: PropTypes.func,
    checked: PropTypes.array,
  }),
};

export default DataContainer;
