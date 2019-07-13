import { WeElement, define, h } from "omi";

class MyApp extends WeElement {
  constructor(...args) {
    super(...args);

    this.add = () => this.store.add();

    this.sub = () => this.store.sub();

    this.addIfOdd = () => {
      if (this.use.count % 2 !== 0) {
        this.store.add();
      }
    };

    this.addAsync = () => {
      setTimeout(() => this.store.add(), 1000);
    };
  }

  render(props) {
    return h(
      "div",
      null,
      h(
        "p",
        null,
        "Clicked: ",
        this.use.count,
        " times",
        " ",
        h(
          "button",
          {
            onClick: this.add
          },
          "+"
        ),
        " ",
        h(
          "button",
          {
            onClick: this.sub
          },
          "-"
        ),
        " ",
        h(
          "button",
          {
            onClick: this.addIfOdd
          },
          "Add if odd"
        ),
        " ",
        h(
          "button",
          {
            onClick: this.addAsync
          },
          "Add async"
        )
      )
    );
  }
}

MyApp.css = `p{color:#58bc58}`;
MyApp.use = [
  {
    count: "count"
  }
];
define("my-app", MyApp);
