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
        const { selected, id } = this.props
        if (selected !== id ) {
            this.setState({shadow: 5})
        }
    }

    unHover = () => {
        this.setState({shadow: 2})
    }

    render() {
        const { selected, id } = this.props

        return (
            <React.Fragment>
                <Paper onClick={() => this.props.select(id)} onMouseOver={this.onHover} onMouseOut={this.unHover} zDepth={this.state.shadow}
                       className={(selected === null? "navCardPaper" : "defaultPaper " + (id === selected? "" : "un" ) + "selected")
                       }
                >
                    {/**TODO: if this is the selected one, add a component having the desired things*/}
                    <div className={"paperContent" + (selected === id? " selectedPaperContent" : "")}>
                        <h1 className="navCardLabel">{this.props.label}</h1>
                        { this.props.icon || <LocalPharmacy/>}
                    </div>
                </Paper>
                { id === selected &&
                    <div className="divContainer">
                        <h1>HERE WE SHOULD HAVE CONTENT</h1>
                    </div>
                }
            </React.Fragment>
        )
    }
}

export default NavigationCard