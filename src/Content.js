import React, { Component } from 'react'
import NavigationCard from './NavigationCard'
import './Content.css'

class Content extends Component {

    constructor(props) {
        super(props)

        this.state = {
            shadows: {
                "paper1": 5,
                "paper2": 5,
                "paper3": 5,
                "paper4": 5,
            }
        }
    }

    render() {
        const { papers } = this.props
        console.log(papers.length)
        return (
            <div className="contentIndex">
                {papers.map(paper => <NavigationCard label={paper.label} icon={paper.icon} class="contentPaper"/>)}
            </div>
        )
    }

}

export default Content