import React from 'react';
import PropTypes from 'prop-types';

import { createRefetchContainer, QueryRenderer } from 'react-relay';
import { identifyDataKey } from '../utils/relay';

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
          columns={props.columns}
          variables={variables}
          cellRender={props.cellRender}
          loading={rendererProps === null}
          dataKey={rendererProps ? identifyDataKey(rendererProps) : null}
          {...rendererProps}
        />}
    />
  );
};

DataList.defaultProps = {
  fragments: {},
  variables: {},
  cellRender: null,
};

DataList.propTypes = {
  environment: PropTypes.object.isRequired,
  query: PropTypes.func.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      property: PropTypes.string,
      render: PropTypes.func,
    }),
  ).isRequired,
  fragments: PropTypes.object,
  variables: PropTypes.object,
  cellRender: PropTypes.func,
};

export default DataList;
