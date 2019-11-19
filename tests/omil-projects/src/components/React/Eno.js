import { Component as WeElement, createElement as h } from "react";
import styled from "styled-components";
import EnoType from "./EnoType.tsx";
const StyledComponents = styled.div`
  p {
    color: #58bc58;
  }
`;
export default EnoType(
  class Eno extends WeElement {
    render() {
      return h(
        StyledComponents,
        null,
        h("div", null, h("p", null, this.state.name))
      );
    }

    constructor(props) {
      super(props);
      this.state = {
        name: "abc",
        age: 18
      };
    }
  }
);
