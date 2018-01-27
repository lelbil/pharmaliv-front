import React, { Component } from 'react'
import { LocalPharmacy, Place, AddCircle, PlayCircleFilled } from 'material-ui-icons/'
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
        return (
            <div style={styles.index}>
                <NavigationCard label="Mes Commandes" icon={<PlayCircleFilled/>}/>
                <NavigationCard label="Trouver Une Pharmacie" icon={<Place/>}/>
                <NavigationCard label="Nouvelle Commande" icon={<AddCircle/>}/>
                <NavigationCard label="Explorer Le Catalogue Des Médicaments" icon={<LocalPharmacy/>}/>
            </div>
        )
    }

}

export default Content