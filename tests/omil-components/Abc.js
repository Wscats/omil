var _temp2;

import { Component as WeElement, createElement as h } from "react";
import styled from "styled-components";
var _temp = 1;
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
    ((_temp2 = class Abc extends WeElement {
      render() {
        return h(StyledComponents, null, h("div", null, "hello world"));
      }

      constructor(props) {
        super(props);
        this.state = 1;
        this.abc = u;

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
    }),
    _temp2)
  )
);
