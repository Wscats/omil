var _temp;

import { Component as WeElement, createElement as h } from "react";
import styled from "styled-components";
import React from "react";
import { Provider, connect } from "react-redux";
import { withRouter } from "react-router";
import store from "../../store/index";
import { Form, Icon, Input, Button, Checkbox } from "antd";
const StyledComponents = styled.div`
  .logBox {
    background: #fff;
    width: 76%;
    height: 20rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .logBox header {
    color: #000;
    text-align: center;
    line-height: 50px;
  }
`;
export default withRouter(
  Form.create({
    name: "normal_login"
  })(
    ((_temp = class Login extends WeElement {
      render() {
        return h(
          StyledComponents,
          null,
          h(
            "div",
            {
              className: "logBox"
            },
            h("header", null, "\u60A8\u597D\uFF0C\u8BF7\u767B\u9646"),
            this.renderWn
          )
        );
      }

      constructor(props) {
        super(props);

        this.handleSubmit = e => {
          e.preventDefault();
          this.props.form.validateFields((err, values) => {
            if (!err) {
              console.log("Received values of form: ", values);
            }
          });
        };

        console.log(props);
        const { getFieldDecorator } = this.props.form;
      }

      renderWn() {
        return h(
          Form,
          {
            onSubmit: this.handleSubmit,
            className: "login-form"
          },
          h(
            Form.Item,
            null,
            getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Please input your username!"
                }
              ]
            })(
              h(Input, {
                prefix: h(Icon, {
                  type: "user",
                  style: {
                    color: "rgba(0,0,0,.25)"
                  }
                }),
                placeholder: "Username"
              })
            )
          ),
          h(
            Form.Item,
            null,
            getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your Password!"
                }
              ]
            })(
              h(Input, {
                prefix: h(Icon, {
                  type: "lock",
                  style: {
                    color: "rgba(0,0,0,.25)"
                  }
                }),
                type: "password",
                placeholder: "Password"
              })
            )
          ),
          h(
            Form.Item,
            null,
            getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(h(Checkbox, null, "Remember me")),
            h(
              "a",
              {
                className: "login-form-forgot",
                href: ""
              },
              "Forgot password"
            ),
            h(
              Button,
              {
                type: "primary",
                htmlType: "submit",
                className: "login-form-button"
              },
              "Log in"
            ),
            "Or ",
            h(
              "a",
              {
                href: ""
              },
              "register now!"
            )
          )
        );
      }
    }),
    _temp)
  )
);
