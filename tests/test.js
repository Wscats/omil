import { Component as WeElement, createElement as h } from "react";
import styled from "styled-components";
import axios from "axios";
const StyledComponents = styled.div`
  div {
    color: #58bc58;
  }
  div span {
    font-size: 14px;
  }
`;
export default connect()(
  class ComponentName extends WeElement {
    render() {
      return h(
        StyledComponents,
        null,
        h("div", null, h("p", null, this.data.title), h("abc", null))
      );
    }

    install() {
      this.data = {
        title: "omi"
      };
    }

    componentDidMount() {}
  }
);
