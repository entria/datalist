import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const Table = ({ config, actions, data, loading, checked }) => {
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
            <checkboxes.component
              disabled={loading}
              checked={data.length > 0 && checked.length >= data.length}
              onChange={event => {
                if (event.target.checked) {
                  actions.checkAll();
                } else {
                  actions.uncheckAll();
                }
              }}
            />
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
            checked={actions.isChecked(row)}
            onChange={event => {
              if (event.target.checked) {
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

  const renderMessage = message => {
    const length = checkboxes.component ? columns.length + 1 : columns.length;

    return (
      <tr>
        <td colSpan={length} style={styles.message}>
          {message}
        </td>
      </tr>
    );
  };

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
    maxWidth: '100%',
    borderCollapse: 'collapse',
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
    checkAll: PropTypes.func,
    uncheckAll: PropTypes.func,
    check: PropTypes.func,
    uncheck: PropTypes.func,
  }).isRequired,
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export default Table;
