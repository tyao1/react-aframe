import React from 'react';
// import ReactDOM from 'react-dom';

import wrapComponent from './utils/wrapComponent';
import {components} from 'aframe';

const exports = {
  wrapComponent,
  Entity: wrapComponent('a-entity'),
  Scene: wrapComponent('a-scene'),
  Animation: wrapComponent('a-animation'),
  Node: wrapComponent('a-node'),
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

function toCamelCase (tagName) {
  return tagName.split('-').reduce( (prev, curr) => {
    return prev + curr[0].toUpperCase() + curr.slice(1);
  }, '');
}

Object.keys(components).forEach(compKey => {
  const key = toCamelCase(compKey);
  exports[key] = wrapComponent('a-' + compKey);
});

module.exports = exports;
