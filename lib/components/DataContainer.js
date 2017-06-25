'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _relay = require('../utils/relay');

var _InfiniteScroll = require('./InfiniteScroll');

var _InfiniteScroll2 = _interopRequireDefault(_InfiniteScroll);

var _Table = require('./Table');

var _Table2 = _interopRequireDefault(_Table);

var _LoadMore = require('./LoadMore');

var _LoadMore2 = _interopRequireDefault(_LoadMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataContainer = function (_Component) {
  _inherits(DataContainer, _Component);

  function DataContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DataContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DataContainer.__proto__ || Object.getPrototypeOf(DataContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      loading: _this.props.loading,
      variables: _this.props.variables,
      count: _this.props.variables.first
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DataContainer, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({
        loading: nextProps.loading
      });
    }
  }, {
    key: 'loadMore',
    value: function loadMore() {
      var _this2 = this;

      var _state = this.state,
          variables = _state.variables,
          count = _state.count;


      var options = _extends({}, variables, {
        first: variables.first + count
      });

      this.setState({
        loading: true,
        variables: options
      });

      this.props.relay.refetch(options, null, function () {
        _this2.setState({
          loading: false
        });
      });
    }
  }, {
    key: 'handleScroll',
    value: function handleScroll() {
      var dataKey = this.props.dataKey;
      var loading = this.state.loading;


      if ((0, _relay.hasNextPage)(this.props, dataKey) && !loading) {
        this.loadMore();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          columns = _props.columns,
          cellRender = _props.cellRender,
          dataKey = _props.dataKey;
      var loading = this.state.loading;

      var data = (0, _relay.createDataArray)(this.props, dataKey);

      return _react2.default.createElement(
        _InfiniteScroll2.default,
        { onScroll: function onScroll() {
            return _this3.handleScroll();
          } },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_Table2.default, { columns: columns, cellRender: cellRender, data: data, loading: loading }),
          _react2.default.createElement(_LoadMore2.default, {
            onClick: function onClick() {
              return _this3.loadMore();
            },
            label: loading ? 'Carregando...' : 'Carregar mais',
            disabled: loading,
            visible: data.length > 0 && (0, _relay.hasNextPage)(this.props, dataKey)
          })
        )
      );
    }
  }]);

  return DataContainer;
}(_react.Component);

DataContainer.defaultProps = {
  dataKey: null,
  loading: false,
  variables: {}
};

DataContainer.propTypes = {
  dataKey: _propTypes2.default.string,
  loading: _propTypes2.default.bool,
  variables: _propTypes2.default.object
};

exports.default = DataContainer;