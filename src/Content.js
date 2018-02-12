import React, { Component } from 'react'
import NavigationCard from './NavigationCard'
import './Content.css'

class Content extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selected: null,
        }
    }

    select = id => {
        this.setState({ selected: this.state.selected === id ? null : id })
    }

    render() {
        const { papers } = this.props

        return (
            <div className="contentIndex">
                {papers.map(paper => <NavigationCard select={this.select} label={paper.label} icon={paper.icon} className="contentPaper" id={paper.id} selected={this.state.selected}/>)}
            </div>
        )
    }

}

export default Content