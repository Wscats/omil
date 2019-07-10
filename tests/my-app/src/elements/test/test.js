import { WeElement, define, h } from "omi";

class ComponentName extends WeElement {
  render() {
    return h(
      "ul",
      null,
      ["a", "b", "c"].map((item, index) => {
        return h(
          "li",
          {
            key: index
          },
          item
        );
      })
    );
  }
}

ComponentName.css = ``;
define("component-name", ComponentName);
