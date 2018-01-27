import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { LocalPharmacy } from 'material-ui-icons'

const styles = {
    paper: {
        flex: 1,
        minWidth: "40%",
        margin: "30px",
        minHeight: "200px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        fontSize: "41px",
    }
}

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
            <Paper id="paper1" onMouseOver={this.onHover} onMouseOut={this.unHover} zDepth={this.state.shadow} style={styles.paper}>
                <h1 style={styles.label}>{this.props.label}</h1>
                { this.props.icon || <LocalPharmacy/>}
            </Paper>
        )
    }
}

export default NavigationCard