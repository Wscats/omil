var omil = require('../libs')

omil({
    sass: 'extension',
    options: null,
    source: `
    <template name="test">
        <div>
            <!-- JSX -->
            <p>123</p>
        </div>
    </template>
    <script>
    // JS
    var a = 'abc'
    import style from './index.css'
    export default {
        css(){
            return style
        }
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
        // console.log(code)
    }
})