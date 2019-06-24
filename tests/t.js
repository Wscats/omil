var omil = require('../libs')
console.log(omil({
    type: 'extension',
    // file: 'html',
    options: null,
    source: `
    <template render={
        123;console.log(1)} name="my-abc-abc">
        <div>
            <!-- JSX -->
            <p>123</p>
        </div>
    </template>
    <script type="module">
    // JS
    var a = 'abcd'
    import style from './index.css'
    import axios from 'axios'
    // const aa = (_temp = _class = class myAbcAbc extends WeElement2 {
    //     css (){
    //         return 
    //     }
    // })
    module.exports = {
        // aaa
        // bbb
        // static css = style + a
        css(){
            return 'ooooo'
        }
        css(){}
        static arr = ['a','b','c']
        install() {
            this.data = {
            }
        }
        render(){
            let a = 1;
            return 'abc'
        }
        render(){

        }
        abc
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
        // console.log(code)
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