import { Component as WeElement, createElement as h } from "react";
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
      h("div", null, h("p", null, this.state.title))
    );
  }

  constructor(props) {
    super(props);
    this.state = {
      title: "react"
    };
  }

  componentDidMount() {
    console.log("生命周期");
  }
}

ComponentName.css = `
/* CSS */
p {color: #58bc58};
`;
export default ComponentName;
