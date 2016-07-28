'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = serializeProps;

var _aframe = require('aframe');

var styleParser = _aframe.utils.styleParser;
function serializeProps(props) {
  var serialProps = {};
  Object.keys(props).forEach(function (key) {
    if (['children', 'mixin'].indexOf(key) !== -1) {
      return;
    }

    if (typeof props[key] === 'function') {
      return;
    }

    if (Array.isArray(props[key])) {
      //Stringify components passed as array.
      serialProps[key] = props[key].join(' ');
    } else if (_typeof(props[key]) === 'object') {
      // Stringify components passed as object.
      serialProps[key] = styleParser.stringify(props[key]);
    } else {
      // Do nothing for components otherwise.
      serialProps[key] = props[key];
    }
  });
  return serialProps;
};