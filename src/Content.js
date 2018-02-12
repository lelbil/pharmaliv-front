import React, { Component } from 'react'
import NavigationCard from './NavigationCard'
import './Content.css'

class Content extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        const { papers } = this.props

        return (
            <div className="contentIndex">
                {papers.map(paper => <NavigationCard id={paper.id} label={paper.label} icon={paper.icon} class="contentPaper"/>)}
            </div>
        )
    }

}

export default Content