'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.hasNextPage = hasNextPage;
exports.createDataArray = createDataArray;
exports.identifyDataKey = identifyDataKey;

var _get = require('lodash/get');

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getData(queryProps, dataKey) {
  if (!queryProps) {
    return {
      edges: [],
      pageInfo: {
        hasNextPage: false
      }
    };
  }

  return (0, _get2.default)(queryProps, dataKey);
}

function hasNextPage(queryProps, dataKey) {
  var data = getData(queryProps, dataKey);
  return _typeof(data.pageInfo) !== (typeof undefined === 'undefined' ? 'undefined' : _typeof(undefined)) && data.pageInfo.hasNextPage;
}

function createDataArray(queryProps, dataKey) {
  var data = getData(queryProps, dataKey);
  if (!data) {
    return [];
  }

  return data.edges.map(function (info) {
    return info.node;
  });
}

function identifyDataKey(queryProps) {
  if (!queryProps) {
    return null;
  }

  var arrayKeys = [];
  arrayKeys.push(Object.keys(queryProps)[0]);

  if (arrayKeys.indexOf('viewer') > -1) {
    arrayKeys.push(Object.keys(queryProps.viewer)[0]);
  }

  return arrayKeys.join('.');
}