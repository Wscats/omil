const babel = require("@babel/core");
const code = babel.transformSync(`
const fn = () => 1;
class A extends B {
    name = 1
    constructor(props){
        super(props)
        this.name = 'eno'
    }
}
`, {
    presets: [
        require("@babel/preset-env")
    ],
    plugins: [
        require("@babel/plugin-proposal-class-properties"),
    ]
});
console.log(code);