'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = wrapComponent;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _serializeProps = require('./serializeProps');

var _serializeProps2 = _interopRequireDefault(_serializeProps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function wrapComponent(tagName) {
  var _class, _temp2;

  return _temp2 = _class = function (_Component) {
    _inherits(_class, _Component);

    function _class() {
      var _Object$getPrototypeO;

      var _temp, _this, _ret;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(_class)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this._eventListeners = {}, _this.attachEvent = function (el) {
        if (!_this._element) {
          (function () {
            var _this2 = _this;
            var props = _this2.props;

            Object.keys(props).forEach(function (rawKey) {
              if (props[rawKey].constructor === Function && rawKey.indexOf('on') === 0) {
                var key = rawKey.toLowerCase();
                // its a event
                if (key.indexOf('capture') > 0) {
                  var domKey = key.substring(2, key.length - 7);
                  el.addEventListener(domKey, props[rawKey], true);
                } else {
                  var _domKey = key.substring(2, key.length);
                  el.addEventListener(_domKey, props[rawKey]);
                }
                console.log('Event Attached for', rawKey);
                _this._eventListeners[rawKey] = props[rawKey];
              }
            });
            _this._element = el;
          })();
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_class, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var _this3 = this;

        Object.keys(nextProps).forEach(function (rawKey) {
          if (nextProps[rawKey].constructor === Function && rawKey.indexOf('on') === 0) {
            if (_this3.props[rawKey] !== nextProps[rawKey]) {
              // function is modified or added
              var domKey = rawKey.toLowerCase().substring(2);
              var needCapture = false;
              if (domKey.indexOf('capture') > 0) {
                needCapture = true;
                domKey = domKey.substring(0, domKey.length - 7);
              }

              if (_this3._eventListeners[rawKey]) {
                // if listener exist, delete
                _this3._element.removeEventListener(domKey, _this3._eventListeners[rawKey]);
              }

              if (nextProps[rawKey]) {
                _this3._element.addEventListener(domKey, nextProps[rawKey], needCapture);
                _this3._eventListeners[rawKey] = nextProps[rawKey];
              } else {
                delete _this3._eventListeners[rawKey];
              }
            }
          }
        });
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        // node will be unmounted, so seems not necessarily to remove listeners
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(tagName, _extends({
          ref: this.attachEvent
        }, (0, _serializeProps2.default)(this.props)), this.props.children);
      }
    }]);

    return _class;
  }(_react.Component), _class.displayName = tagName, _temp2;
}