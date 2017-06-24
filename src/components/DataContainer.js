import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { hasNextPage, createDataArray } from '../utils/relay';

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
    const { dataKey } = this.props;
    const { loading } = this.state;

    if (hasNextPage(this.props, dataKey) && !loading) {
      this.handleLoadMore();
    }
  }

  render() {
    const { columns, cellRender, dataKey } = this.props;
    const { loading } = this.state;
    const data = createDataArray(this.props, dataKey);

    return (
      <InfiniteScroll onScroll={() => this.handleScroll()}>
        <div>
          <Table columns={columns} cellRender={cellRender} data={data} loading={loading} />

          <LoadMore
            onClick={() => this.loadMore()}
            label={loading ? 'Carregando...' : 'Carregar mais'}
            disabled={loading}
            visible={data.length > 0 && hasNextPage(this.props, dataKey)}
          />
        </div>
      </InfiniteScroll>
    );
  }
}

export default DataContainer;
