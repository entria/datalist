import React from 'react';
import PropTypes from 'prop-types';

import { createRefetchContainer, QueryRenderer } from 'react-relay';

import DataContainer from './DataContainer';

const DataList = props => {
  const variables = {
    ...props.variables,
  };
  if (!variables.first) {
    variables.first = 20;
  }

  const DataListRefetchContainer = createRefetchContainer(
    DataContainer,
    props.fragments,
    props.query,
  );

  return (
    <QueryRenderer
      environment={props.environment}
      query={props.query}
      variables={variables}
      render={({ props: rendererProps }) =>
        <DataListRefetchContainer
          variables={variables}
          loading={rendererProps === null}
          table={props.table}
          {...rendererProps}
        />}
    />
  );
};

DataList.defaultProps = {
  fragments: {},
  variables: {},
  table: {
    columns: [],
    cellRender: null,
    checkboxes: {},
  },
};

DataList.propTypes = {
  environment: PropTypes.object.isRequired,
  query: PropTypes.func.isRequired,
  fragments: PropTypes.object,
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

export default DataList;
