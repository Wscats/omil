import { WeElement, define, html } from "omi";

const aB = class extends WeElement {
  render() {
    return html`
      <div>
        hello worldaaa
      </div>
    `;
  }

  static css =
    `
    div{
        color:red
    }
` +
    "abc" +
    "cba";
  render() {
    return;
  }
  css() {}
};

define("a-b", aB);
