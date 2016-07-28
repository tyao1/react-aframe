'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _wrapComponent = require('./utils/wrapComponent');

var _wrapComponent2 = _interopRequireDefault(_wrapComponent);

var _aframe = require('aframe');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// import ReactDOM from 'react-dom';

var _exports = {
  wrapComponent: _wrapComponent2.default,
  Entity: (0, _wrapComponent2.default)('a-entity'),
  Scene: (0, _wrapComponent2.default)('a-scene'),
  Animation: (0, _wrapComponent2.default)('a-animation'),
  Node: (0, _wrapComponent2.default)('a-node')
};

/*
function toCamelCase (tagName) {
  const splits = tagName.split('-');
  const initial = splits.shift();
  if (!splits.length) return initial;
  return splits.reduce( (prev, curr) => {
    return prev + curr[0].toUpperCase() + curr.slice(1);
  }, initial);
}
*/

function toCamelCase(tagName) {
  return tagName.split('-').reduce(function (prev, curr) {
    return prev + curr[0].toUpperCase() + curr.slice(1);
  }, '');
}

Object.keys(_aframe.components).forEach(function (compKey) {
  var key = toCamelCase(compKey);
  _exports[key] = (0, _wrapComponent2.default)('a-' + compKey);
});

module.exports = _exports;