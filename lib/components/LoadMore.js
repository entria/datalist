'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoadMore = function LoadMore(_ref) {
  var label = _ref.label,
      onClick = _ref.onClick,
      disabled = _ref.disabled,
      visible = _ref.visible;

  var wrapperStyles = _extends({}, styles.wrapper);
  if (!visible) {
    wrapperStyles.opacity = 0;
    wrapperStyles.paddingTop = 0;
  }

  return _react2.default.createElement(
    'div',
    { style: wrapperStyles },
    _react2.default.createElement(
      'span',
      { onClick: onClick, disabled: disabled, style: styles.button },
      label
    )
  );
};

var styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    transition: 'all 0.2s',
    opacity: 1,
    paddingTop: 20
  },
  button: {
    fontSize: 16,
    color: '#bababa',
    textTransform: 'uppercase',
    cursor: 'pointer'
  }
};

LoadMore.defaultProps = {
  label: 'Carregar mais',
  visible: true,
  disabled: false
};

LoadMore.propTypes = {
  onClick: _propTypes2.default.func.isRequired,
  label: _propTypes2.default.string,
  visible: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool
};

exports.default = LoadMore;