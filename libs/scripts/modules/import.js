const {
    isCaptain
} = require('../extension/convert')

module.exports = (option) => {
    const {
        script,
        isExistScript,
        scriptLang,
        template,
        templateLang,
        templateComponentName,
        templateFrameworkName,
        style,
        styleLang,
        isExistStyle,
        sourceObj
    } = option
    // console.log(style)
    const {
        file
    } = sourceObj
    switch (file) {
        case 'html':
            return `
                const {
                    ${
                // register component
                'WeElement,'
                }
                    ${
                // when you use component, you should define
                templateComponentName ? 'define,' : ''
                }
                    html,
                    h,
                    render
                } = omi;
            `
            break
        default:
            // console.log(isCaptain(templateComponentName))
            switch (isCaptain(templateComponentName)) {
                // A
                case true:
                    return `
                        import {
                            ${
                        // register component
                        'Component as WeElement,'
                        }
                            ${
                        // JSX or HTML
                        // html,
                        // htm,
                        templateLang === 'html' || templateLang === 'htm' ? 'html' : 'createElement as h'
                        }
                        } from '${
                        // react , omi or rax
                        templateFrameworkName ? templateFrameworkName : 'react'
                        }';
                    `
                        // css
                        +
                        `
                        ${style ? 'import styled from "styled-components"' : ''}
                    `
                    // + `
                    //     ${style ? 'const StyledComponents = styled.div`' + style + '`' : ''}
                    // `
                    // +
                    // `
                    // import {
                    //     ${
                    //         // when you use component, you should define
                    //         templateComponentName ? 'render,' : ''
                    //     }
                    //     ${
                    //         'findDOMNode'
                    //     }
                    // } from "react-dom"
                    // `
                    break;
                // a
                default:
                    return `
                        import {
                            ${
                        // register component
                        'WeElement,'
                        }
                            ${
                        // when you use component, you should define
                        templateComponentName ? 'define,' : ''
                        }
                            ${
                        // JSX or HTML
                        // html,
                        // htm,
                        templateLang === 'html' || templateLang === 'htm' ? 'html' : 'h'
                        }
                        } from  '${
                        // react , omi or rax
                        templateFrameworkName ? templateFrameworkName : 'omi'
                        }';
                    `
                    break;
            }
    }

}