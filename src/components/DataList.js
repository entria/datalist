import React from 'react';
import PropTypes from 'prop-types';

import { createRefetchContainer, QueryRenderer } from 'react-relay';

import { sanitizeVariables } from '../utils/props';
import DataContainer from './DataContainer';

const DataList = props => {
  const variables = sanitizeVariables(props.variables);

  const { fragments, query } = props;
  const DataListRefetchContainer = createRefetchContainer(DataContainer, fragments, query);

  const { table, checkboxes } = props;
  return (
    <QueryRenderer
      environment={props.environment}
      query={props.query}
      variables={variables}
      render={({ props: rendererProps }) =>
        <DataListRefetchContainer
          variables={variables}
          loading={rendererProps === null}
          table={table}
          checkboxes={checkboxes}
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
  },
  checkboxes: {
    component: null,
    onCheck: null,
    checked: [],
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
    ),
    cellRender: PropTypes.func,
  }),
  checkboxes: PropTypes.shape({
    component: PropTypes.any,
    onCheck: PropTypes.func,
    checked: PropTypes.array,
  }),
};

export default DataList;
