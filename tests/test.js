var omil = require('../libs')
console.log(omil({
    type: 'extension',
    file: 'html',
    options: null,
    source: `
    <template  name="my-abc-abc" lang="html" >
        <div>
            <!-- JSX -->
            <p>123</p>
        </div>
    </template>
    <script>
    // JS
    var a = 'abcd'
    import style from './index.css'
    import axios from 'axios'
    export default {
        static js = 'p'
        static css = 'p'
        install() {
            this.data = {
            }
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
        console.log(code)
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