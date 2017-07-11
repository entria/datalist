import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

const Table = ({ columns, data, cellRender, loading }) => {
  const generateKey = (column, index) => {
    const property = column.property || 'noProperty';
    return property + index.toString();
  };

  const renderHeader = () =>
    <thead>
      <tr>
        {columns.map((column, index) =>
          <th key={generateKey(column, index)} style={styles.th}>{column.label}</th>,
        )}
      </tr>
    </thead>;

  const renderRow = (row, rowIndex) =>
    <tr key={rowIndex}>
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
  cellRender: null,
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      property: PropTypes.string,
      render: PropTypes.func,
    }),
  ).isRequired,
  data: PropTypes.array,
  cellRender: PropTypes.func,
  loading: PropTypes.bool,
};

export default Table;
