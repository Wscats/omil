var omil = require('../libs')
console.log(omil({
    type: 'extension',
    // file: 'html',
    options: null,
    source: `
    <template name="my-abc-abc">
        connect(
            <div>
                <!-- JSX -->
                <input>
                <p>123</p>
            </div>
        )
    </template>
    <script lang="ts">
    // JS
    
    import style from './index.css'
    import axios from 'axios'
    var a = 'abcd'
    // const aa = (_temp = _class = class myAbcAbc extends WeElement2 {
    //     css (){
    //         return 
    //     }
    // })
    
    export default class{
        state = 1
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
    }
    1
    </script>
    <style lang='scss'>
    p{
        color:red;
        span{
            font-size:14px
        }
    }
    </style>
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
}));