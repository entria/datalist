import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const Table = ({ columns, cellRender, checkboxes, data, loading }) => {
  const generateKey = (column, index) => {
    const property = column.property || 'noProperty';
    return property + index.toString();
  };

  const renderHeader = () =>
    <thead>
      <tr>
        {checkboxes.store &&
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
      {checkboxes.store &&
        <td style={styles.td}>
          <checkboxes.component />
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
  cellRender: null,
  checkboxes: {},
  data: [],
  loading: false,
};

Table.propTypes = {
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
  data: PropTypes.array,
  loading: PropTypes.bool,
};

export default Table;
