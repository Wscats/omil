import { WeElement, define, h } from "omi";

class MyTest extends WeElement {
  render() {
    return h(
      "div",
      {
        class: "example"
      },
      this.data.msg
    );
  }

  install() {
    this.data = {
      msg: "Hello world!"
    };
  }
}

MyTest.css = `
.example {
  color: red;
}
`;
define("my-test", MyTest);
