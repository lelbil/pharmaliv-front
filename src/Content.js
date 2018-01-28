import React, { Component } from 'react'
import NavigationCard from './NavigationCard'

const styles= {
    index: {
        display: "flex",
        flexWrap: "wrap",
        height: "100%",
        alignContent: "center",
    },
    paper: {
        flex: 1,
        minWidth: "40%",
        margin: "30px",
        minHeight: "200px",
        cursor: "pointer"
    }
}

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
            <div style={styles.index}>
                {papers.map(paper => <NavigationCard label={paper.label} icon={paper.icon}/>)}
            </div>
        )
    }

}

export default Content