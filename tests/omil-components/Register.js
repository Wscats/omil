"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _antd = require("antd");

var _reactRouter = require("react-router");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === "function" &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? "symbol"
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _templateObject() {
  var data = _taggedTemplateLiteral([
    "\n  .regBox {\n    background: #fff;\n    width: 76%;\n    height: 20rem;\n    position: absolute;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n  }\n"
  ]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(
    Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })
  );
}

var StyledComponents = _styledComponents["default"].div(_templateObject());

var _default = (0, _reactRouter.withRouter)(
  _antd.Form.create({
    name: "register"
  })(
    (function(_WeElement) {
      _inherits(Register, _WeElement);

      _createClass(Register, [
        {
          key: "render",
          value: function render() {
            return (0, _react.createElement)(
              StyledComponents,
              null,
              (0, _react.createElement)(
                "header",
                {
                  className: "regBox"
                },
                "register"
              ),
              this.renderWn()
            );
          }
        }
      ]);

      function Register(props) {
        var _this;

        _classCallCheck(this, Register);

        _this = _possibleConstructorReturn(
          this,
          _getPrototypeOf(Register).call(this, props)
        );
        _this.state = {
          confirmDirty: false,
          autoCompleteResult: []
        };
        return _this;
      }

      _createClass(Register, [
        {
          key: "handleSubmit",
          value: function handleSubmit(e) {
            e.preventDefault();
            this.props.form.validateFieldsAndScroll(function(err, values) {
              if (!err) {
                console.log("Received values of form: ", values);
              }
            });
          }
        },
        {
          key: "handleConfirmBlur",
          value: function handleConfirmBlur(e) {
            var value = e.target.value;
            this.setState({
              confirmDirty: this.state.confirmDirty || !!value
            });
          }
        },
        {
          key: "compareToFirstPassword",
          value: function compareToFirstPassword(rule, value, callback) {
            var form = this.props.form;

            if (value && value !== form.getFieldValue("password")) {
              callback("Two passwords that you enter is inconsistent!");
            } else {
              callback();
            }
          }
        },
        {
          key: "validateToNextPassword",
          value: function validateToNextPassword(rule, value, callback) {
            var form = this.props.form;

            if (value && this.state.confirmDirty) {
              form.validateFields(["confirm"], {
                force: true
              });
            }

            callback();
          }
        },
        {
          key: "handleWebsiteChange",
          value: function handleWebsiteChange(value) {
            var autoCompleteResult;

            if (!value) {
              autoCompleteResult = [];
            } else {
              autoCompleteResult = [".com", ".org", ".net"].map(function(
                domain
              ) {
                return "".concat(value).concat(domain);
              });
            }

            this.setState({
              autoCompleteResult: autoCompleteResult
            });
          }
        },
        {
          key: "renderWn",
          value: function renderWn() {
            var Option = _antd.Select.Option;
            var AutoCompleteOption = _antd.AutoComplete.Option;
            var residences = [
              {
                value: "zhejiang",
                label: "Zhejiang",
                children: [
                  {
                    value: "hangzhou",
                    label: "Hangzhou",
                    children: [
                      {
                        value: "xihu",
                        label: "West Lake"
                      }
                    ]
                  }
                ]
              },
              {
                value: "jiangsu",
                label: "Jiangsu",
                children: [
                  {
                    value: "nanjing",
                    label: "Nanjing",
                    children: [
                      {
                        value: "zhonghuamen",
                        label: "Zhong Hua Men"
                      }
                    ]
                  }
                ]
              }
            ];
            var getFieldDecorator = this.props.form.getFieldDecorator;
            var autoCompleteResult = this.state.autoCompleteResult;
            var formItemLayout = {
              labelCol: {
                xs: {
                  span: 24
                },
                sm: {
                  span: 8
                }
              },
              wrapperCol: {
                xs: {
                  span: 24
                },
                sm: {
                  span: 16
                }
              }
            };
            var tailFormItemLayout = {
              wrapperCol: {
                xs: {
                  span: 24,
                  offset: 0
                },
                sm: {
                  span: 16,
                  offset: 8
                }
              }
            };
            var prefixSelector = getFieldDecorator("prefix", {
              initialValue: "86"
            })(
              (0, _react.createElement)(
                _antd.Select,
                {
                  style: {
                    width: 70
                  }
                },
                (0, _react.createElement)(
                  Option,
                  {
                    value: "86"
                  },
                  "+86"
                ),
                (0, _react.createElement)(
                  Option,
                  {
                    value: "87"
                  },
                  "+87"
                )
              )
            );
            var websiteOptions = autoCompleteResult.map(function(website) {
              return (0, _react.createElement)(
                AutoCompleteOption,
                {
                  key: website
                },
                website
              );
            });
            return (0, _react.createElement)(
              _antd.Form,
              _extends({}, formItemLayout, {
                onSubmit: this.handleSubmit.bind(this)
              }),
              (0, _react.createElement)(
                _antd.Form.Item,
                {
                  label: "E-mail"
                },
                getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "The input is not valid E-mail!"
                    },
                    {
                      required: true,
                      message: "Please input your E-mail!"
                    }
                  ]
                })((0, _react.createElement)(_antd.Input, null))
              ),
              (0, _react.createElement)(
                _antd.Form.Item,
                {
                  label: "Password",
                  hasFeedback: true
                },
                getFieldDecorator("password", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your password!"
                    },
                    {
                      validator: this.validateToNextPassword.bind(this)
                    }
                  ]
                })((0, _react.createElement)(_antd.Input.Password, null))
              ),
              (0, _react.createElement)(
                _antd.Form.Item,
                {
                  label: "Confirm Password",
                  hasFeedback: true
                },
                getFieldDecorator("confirm", {
                  rules: [
                    {
                      required: true,
                      message: "Please confirm your password!"
                    },
                    {
                      validator: this.compareToFirstPassword.bind(this)
                    }
                  ]
                })(
                  (0, _react.createElement)(_antd.Input.Password, {
                    onBlur: this.handleConfirmBlur.bind(this)
                  })
                )
              ),
              (0, _react.createElement)(
                _antd.Form.Item,
                {
                  label: (0, _react.createElement)(
                    "span",
                    null,
                    "Nickname\xA0",
                    (0, _react.createElement)(
                      _antd.Tooltip,
                      {
                        title: "What do you want others to call you?"
                      },
                      (0, _react.createElement)(_antd.Icon, {
                        type: "question-circle-o"
                      })
                    )
                  )
                },
                getFieldDecorator("nickname", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your nickname!",
                      whitespace: true
                    }
                  ]
                })((0, _react.createElement)(_antd.Input, null))
              ),
              (0, _react.createElement)(
                _antd.Form.Item,
                {
                  label: "Habitual Residence"
                },
                getFieldDecorator("residence", {
                  initialValue: ["zhejiang", "hangzhou", "xihu"],
                  rules: [
                    {
                      type: "array",
                      required: true,
                      message: "Please select your habitual residence!"
                    }
                  ]
                })(
                  (0, _react.createElement)(_antd.Cascader, {
                    options: residences
                  })
                )
              ),
              (0, _react.createElement)(
                _antd.Form.Item,
                {
                  label: "Phone Number"
                },
                getFieldDecorator("phone", {
                  rules: [
                    {
                      required: true,
                      message: "Please input your phone number!"
                    }
                  ]
                })(
                  (0, _react.createElement)(_antd.Input, {
                    addonBefore: prefixSelector,
                    style: {
                      width: "100%"
                    }
                  })
                )
              ),
              (0, _react.createElement)(
                _antd.Form.Item,
                {
                  label: "Website"
                },
                getFieldDecorator("website", {
                  rules: [
                    {
                      required: true,
                      message: "Please input website!"
                    }
                  ]
                })(
                  (0, _react.createElement)(
                    _antd.AutoComplete,
                    {
                      dataSource: websiteOptions,
                      onChange: this.handleWebsiteChange.bind(this),
                      placeholder: "website"
                    },
                    (0, _react.createElement)(_antd.Input, null)
                  )
                )
              ),
              (0, _react.createElement)(
                _antd.Form.Item,
                {
                  label: "Captcha",
                  extra: "We must make sure that your are a human."
                },
                (0, _react.createElement)(
                  _antd.Row,
                  {
                    gutter: 8
                  },
                  (0, _react.createElement)(
                    _antd.Col,
                    {
                      span: 12
                    },
                    getFieldDecorator("captcha", {
                      rules: [
                        {
                          required: true,
                          message: "Please input the captcha you got!"
                        }
                      ]
                    })((0, _react.createElement)(_antd.Input, null))
                  ),
                  (0, _react.createElement)(
                    _antd.Col,
                    {
                      span: 12
                    },
                    (0, _react.createElement)(_antd.Button, null, "Get captcha")
                  )
                )
              ),
              (0, _react.createElement)(
                _antd.Form.Item,
                tailFormItemLayout,
                getFieldDecorator("agreement", {
                  valuePropName: "checked"
                })(
                  (0, _react.createElement)(
                    _antd.Checkbox,
                    null,
                    "I have read the ",
                    (0, _react.createElement)(
                      "a",
                      {
                        href: ""
                      },
                      "agreement"
                    )
                  )
                )
              ),
              (0, _react.createElement)(
                _antd.Form.Item,
                tailFormItemLayout,
                (0, _react.createElement)(
                  _antd.Button,
                  {
                    type: "primary",
                    htmlType: "submit"
                  },
                  "Register"
                )
              )
            );
          }
        }
      ]);

      return Register;
    })(_react.Component)
  )
);

exports["default"] = _default;
