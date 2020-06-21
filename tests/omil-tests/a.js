var omil = require('../../libs')
omil({
    type: 'extension',
    // file: 'html',
    options: null,
    source: `
    <template name="My-abc-abc">
            <div>
                <!-- JSX -->
                <input/>
                <p>123</p>
            </div>
    </template>
    <script>
        export default (class{
        constructor(props){
            super(props)
        }
        // state = 1
        abc = ()=>{
            console.log(1)
        }
    // module.exports = class {
        // aaa
        // bbb

        // static css = style + a
        css(){
            return 'ooooo'
        }
        css(){}
        // static arr = ['a','b','c']
        install() {
            this.data = {
            }
        }
        render(){
            let a = 1;
            return 'abc'
        }
        render(){
            let a = 1;
            return 'abc'
        }
        render(){

        }
    })
    </script>
    `,
    callback(code) {
        console.log(code.allScript)
    }
}).compileSass(`
p{
    color:red;
    span{
        font-size:14px
    }
}
`).then((data) => {
    // console.log(data.text)
});