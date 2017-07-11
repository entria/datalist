'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRelay = require('react-relay');

var _relay = require('../utils/relay');

var _DataContainer = require('./DataContainer');

var _DataContainer2 = _interopRequireDefault(_DataContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataList = function DataList(props) {
  var variables = _extends({}, props.variables);
  if (!variables.first) {
    variables.first = 20;
  }

  var DataListRefetchContainer = (0, _reactRelay.createRefetchContainer)(_DataContainer2.default, props.fragments, props.query);

  return _react2.default.createElement(_reactRelay.QueryRenderer, {
    environment: props.environment,
    query: props.query,
    variables: variables,
    render: function render(_ref) {
      var rendererProps = _ref.props;
      return _react2.default.createElement(DataListRefetchContainer, _extends({
        columns: props.columns,
        variables: variables,
        cellRender: props.cellRender,
        loading: rendererProps === null,
        dataKey: rendererProps ? (0, _relay.identifyDataKey)(rendererProps) : null
      }, rendererProps));
    }
  });
};

DataList.defaultProps = {
  fragments: {},
  variables: {},
  cellRender: null
};

DataList.propTypes = {
  environment: _propTypes2.default.object.isRequired,
  query: _propTypes2.default.func.isRequired,
  columns: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string,
    property: _propTypes2.default.string,
    render: _propTypes2.default.func
  })).isRequired,
  fragments: _propTypes2.default.object,
  variables: _propTypes2.default.object,
  cellRender: _propTypes2.default.func
};

exports.default = DataList;