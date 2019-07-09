import { WeElement, h } from "omi";
const StyledComponents = styled.div`
  .example {
    color: red;
  }
`;
export default class _class extends WeElement {
  render() {
    return h(
      "div",
      {
        class: "example"
      },
      {
        msg
      }
    );
  }

  data() {
    return {
      msg: "Hello world!"
    };
  }
}
_class.css = `
.example {
  color: red;
}
`;
