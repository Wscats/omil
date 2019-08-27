import { Component as WeElement, createElement as h } from "rax";
import styled from "styled-components";
const StyledComponents = styled.div`
  /* CSS */
  p {
    color: #58bc58;
  }
`;

class ComponentName extends WeElement {
  render() {
    return h(
      StyledComponents,
      null,
      h("div", null, h("input", null), this.data.title)
    );
  }

  install() {
    this.data = {
      title: "Hello World"
    };
  }
}

export default ComponentName;
