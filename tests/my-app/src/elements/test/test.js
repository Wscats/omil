import { WeElement, define, h } from "omi";

class MyTest extends WeElement {
  render() {
    return h(
      "div",
      {
        onClick: this.testClick
      },
      this.data.title
    );
  }

  install() {
    this.data = {
      title: "123 Eno Yao !"
    };
  }

  testClick() {
    alert("Bye!");
  }
}

MyTest.css = `div{background:red;color:white;height:60px;line-height:60px}`;
define("my-test", MyTest);
