import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const Table = ({ config, actions, data, loading }) => {
  const { columns, cellRender } = config.table;
  const { checkboxes } = config;

  const generateKey = (column, index) => {
    const property = column.property || 'noProperty';
    return property + index.toString();
  };

  const renderHeader = () =>
    <thead>
      <tr>
        {checkboxes.component &&
          <th style={styles.th}>
            <checkboxes.component />
          </th>}
        {columns.map((column, index) =>
          <th key={generateKey(column, index)} style={styles.th}>{column.label}</th>,
        )}
      </tr>
    </thead>;

  const renderRow = (row, rowIndex) =>
    <tr key={rowIndex}>
      {checkboxes.component &&
        <td style={styles.td}>
          <checkboxes.component
            onChange={event => {
              const { checked } = event.target;
              if (checked) {
                actions.check(row);
              } else {
                actions.uncheck(row);
              }
            }}
          />
        </td>}
      {columns.map((column, colIndex) => {
        let cell;
        if (column.render) {
          cell = column.render(row);
        } else {
          const value = get(row, column.property);
          cell = cellRender ? cellRender(value, row) : value;
        }

        return (
          <td key={generateKey(column, colIndex)} style={styles.td}>
            {cell}
          </td>
        );
      })}
    </tr>;

  const renderMessage = message =>
    <tr>
      <td colSpan={columns.length} style={styles.message}>
        {message}
      </td>
    </tr>;

  return (
    <table style={styles.wrapper}>
      {renderHeader()}

      <tbody>
        {data.map(renderRow)}
        {data.length < 1 &&
          renderMessage(loading ? 'Carregando...' : 'Nenhum registro encontrado.')}
      </tbody>
    </table>
  );
};

const styles = {
  wrapper: {
    width: '100%',
  },
  th: {
    padding: '10px 20px',
    fontSize: 14,
    color: '#bababa',
    textTransform: 'uppercase',
    textAlign: 'left',
    borderBottom: '2px solid #eee',
  },
  td: {
    padding: 20,
  },
  message: {
    padding: 20,
    fontSize: 14,
    color: '#bdbdbd',
    textAlign: 'center',
  },
};

Table.defaultProps = {
  data: [],
  loading: false,
};

Table.propTypes = {
  config: PropTypes.shape({
    table: PropTypes.shape({
      columns: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          property: PropTypes.string,
          render: PropTypes.func,
        }),
      ),
      cellRender: PropTypes.func,
    }).isRequired,
    checkboxes: PropTypes.shape({
      component: PropTypes.any,
      onChange: PropTypes.func,
      checked: PropTypes.array,
    }),
  }).isRequired,
  actions: PropTypes.shape({
    check: PropTypes.func,
    uncheck: PropTypes.func,
  }).isRequired,
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export default Table;
