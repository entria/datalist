import React from 'react';
import PropTypes from 'prop-types';

import { createRefetchContainer, QueryRenderer } from 'react-relay';

import { sanitizeVariables } from '../utils/props';
import DataContainer from './DataContainer';

const DataList = props => {
  const variables = sanitizeVariables(props.variables);

  const { fragments, query } = props;
  const DataListRefetchContainer = createRefetchContainer(DataContainer, fragments, query);

  const { table, checkboxes, list } = props;
  return (
    <QueryRenderer
      environment={props.environment}
      query={props.query}
      variables={variables}
      render={({ props: rendererProps }) => {
        if (rendererProps) {
          return (
            <DataListRefetchContainer
              variables={variables}
              loading={rendererProps === null}
              table={table}
              checkboxes={checkboxes}
              list={list}
              {...rendererProps}
            />
          );
        }

        return null;
      }}
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
    onChange: null,
    checked: [],
  },
};

DataList.propTypes = {
  query: PropTypes.func.isRequired,
  environment: PropTypes.object.isRequired,
  list: PropTypes.string.isRequired,
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
    onChange: PropTypes.func,
    checked: PropTypes.array,
  }),
};

export default DataList;
