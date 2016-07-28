'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = serializeProps;

var _aframe = require('aframe');

var styleParser = _aframe.utils.styleParser;
function serializeProps(props) {
  var serialProps = {};
  Object.keys(props).forEach(function (key) {
    if (['children', 'mixin'].indexOf(key) !== -1) {
      return;
    }

    if (props[key].constructor === Function) {
      return;
    }

    if (props[key].constructor === Array) {
      //Stringify components passed as array.
      serialProps[key] = props[key].join(' ');
    } else if (props[key].constructor === Object) {
      // Stringify components passed as object.
      serialProps[key] = styleParser.stringify(props[key]);
    } else {
      // Do nothing for components otherwise.
      serialProps[key] = props[key];
    }
  });
  return serialProps;
};