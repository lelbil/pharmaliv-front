import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { LocalPharmacy } from 'material-ui-icons'
import './NavigationCard.css'

class NavigationCard extends Component {

    constructor(props) {
        super(props)

        this.state = {
            shadow: 2,
        }
    }

    onHover = () => {
        this.setState({shadow: 5})
    }

    unHover = () => {
        this.setState({shadow: 2})
    }

    render() {
        return (
            <Paper onMouseOver={this.onHover} onMouseOut={this.unHover} zDepth={this.state.shadow} className="navCardPaper">
                <h1 className="navCardLabel">{this.props.label}</h1>
                { this.props.icon || <LocalPharmacy/>}
            </Paper>
        )
    }
}

export default NavigationCard