"use strict";

var omil = require('../libs');

console.log(omil({
  type: 'extension',
  // file: 'html',
  options: null,
  source: "\n    <template name=\"My-abc-abc\">\n        connect(\n            <div>\n                <!-- JSX -->\n                <input/>\n                <p>123</p>\n            </div>\n        )\n    </template>\n    <script lang=\"ts\">\n    // JS\n    \n    import style from './index.css'\n    import axios from 'axios'\n    var a = 'abcd'\n    // const aa = (_temp = _class = class myAbcAbc extends WeElement2 {\n    //     css (){\n    //         return \n    //     }\n    // })\n    \n    export default class{\n        state = 1\n    // module.exports = class {\n        // aaa\n        // bbb\n\n        // static css = style + a\n        css(){\n            return 'ooooo'\n        }\n        css(){}\n        // static arr = ['a','b','c']\n        install() {\n            this.data = {\n            }\n        }\n        render(){\n            let a = 1;\n            return 'abc'\n        }\n        render(){\n            let a = 1;\n            return 'abc'\n        }\n        render(){\n\n        }\n    }\n    1\n    </script>\n    <style lang='scss'>\n    p{\n        color:red;\n        span{\n            font-size:14px\n        }\n    }\n    </style>\n    ",
  callback: function callback(code) {
    console.log(code.allScript);
  }
}).compileSass("\np{\n    color:red;\n    span{\n        font-size:14px\n    }\n}\n").then(function (data) {// console.log(data.text)
}));