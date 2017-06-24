'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = function Table(_ref) {
  var columns = _ref.columns,
      data = _ref.data,
      cellRender = _ref.cellRender,
      loading = _ref.loading;

  var renderHeader = function renderHeader() {
    return _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        columns.map(function (column) {
          return _react2.default.createElement(
            'th',
            { key: column.property, style: styles.th },
            column.label
          );
        })
      )
    );
  };

  var renderRow = function renderRow(row, index) {
    return _react2.default.createElement(
      'tr',
      { key: index },
      columns.map(function (column) {
        var cell = void 0;
        if (column.render) {
          cell = column.render(row);
        } else {
          var value = _lodash2.default.get(row, column.property);
          cell = cellRender ? cellRender(value, row) : value;
        }

        return _react2.default.createElement(
          'td',
          { key: column.property, style: styles.td },
          cell
        );
      })
    );
  };

  var renderMessage = function renderMessage(message) {
    return _react2.default.createElement(
      'tr',
      null,
      _react2.default.createElement(
        'td',
        { colSpan: columns.length, style: styles.message },
        message
      )
    );
  };

  return _react2.default.createElement(
    'table',
    { style: styles.wrapper },
    renderHeader(),
    _react2.default.createElement(
      'tbody',
      null,
      data.map(renderRow),
      data.length < 1 && renderMessage(loading ? 'Carregando...' : 'Nenhum registro encontrado.')
    )
  );
};

var styles = {
  wrapper: {
    width: '100%'
  },
  th: {
    padding: '10px 20px',
    fontSize: 14,
    color: '#bababa',
    textTransform: 'uppercase',
    textAlign: 'left',
    borderBottom: '2px solid #eee'
  },
  td: {
    padding: 20
  },
  message: {
    padding: 20,
    fontSize: 14,
    color: '#bdbdbd',
    textAlign: 'center'
  }
};

Table.defaultProps = {
  data: [],
  loading: false,
  cellRender: function cellRender() {}
};

Table.propTypes = {
  columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string,
    property: _propTypes2.default.string,
    render: _propTypes2.default.func
  })).isRequired,
  data: _propTypes2.default.array,
  cellRender: _propTypes2.default.func,
  loading: _propTypes2.default.bool
};

exports.default = Table;