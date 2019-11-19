import React from 'react';
interface EnoTypeProps { }
interface EnoTypeState { name: string }
export default (Component: React.ComponentType) => {
    return class EnoType extends React.Component<EnoTypeProps, EnoTypeState> {
        constructor(props: EnoTypeProps) {
            super(props)
            this.state = { name: 'Eno Yao' }
        }
        render() { return <Component /> }
    }
}