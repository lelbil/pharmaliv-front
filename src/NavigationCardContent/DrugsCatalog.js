import React, { Component } from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import { AddShoppingCart } from 'material-ui-icons'
import { IconButton } from 'material-ui'

import { filtresProduit } from '../JS/constants'
import { includes, eliminate } from '../JS/utils'
import './DrugsCatalog.css'

//Todo: try to have an automatic margin-top or to align-items to center
const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        height: '40vh',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    },
}

const tilesData = [
    {
        id: 1,
        imgLink: 'https://www.pharmarket.com/media/fr_FR3573577/f1200xf1200/doliprane-tabs-1000mg-8-comprimes-f1200-f1200.png',
        nom: 'Doliprane',
        prix: 2.4,
        description: 'Paracetamol, also known as acetaminophen or APAP, is a medicine used to treat pain and fever. It is typically used for mild to moderate pain relief. Evidence for its use to relieve fever in children is mixed',
        ordonnance: false,
        categorie: 'MEDICAMENTS'
    },
    {
        id: 2,
        imgLink: 'https://rukminim1.flixcart.com/image/1408/1408/j6wi0sw0/protein-supplement/v/p/p/on0028-optimum-nutrition-original-imaewphvd8muxygx.jpeg?q=90',
        nom: 'GOLD STANDARD 100% WHEY PROTEIN',
        prix: 59.9,
        description: 'Whey protein is a mixture of globular proteins isolated from whey, the liquid material created as a by-product of cheese production. Whey protein is commonly marketed as a dietary supplement, and various health claims have been attributed to it in the alternative medicine community.',
        ordonnance: false,
        categorie: 'COMPLEMENTS_ALIMENTAIRES'
    },
    {
        id: 3,
        imgLink: 'https://s1.thcdn.com/productimg/600/600/10797926-2074366927376922.jpg',
        nom: 'IMPACT WHEY PROTEIN 250G',
        prix: 6.99,
        description: 'Whey protein is a mixture of globular proteins isolated from whey, the liquid material created as a by-product of cheese production. Whey protein is commonly marketed as a dietary supplement, and various health claims have been attributed to it in the alternative medicine community.',
        ordonnance: false,
        categorie: 'COMPLEMENTS_ALIMENTAIRES'
    },
    {
        id: 4,
        imgLink: 'https://posomed.fr/img/products/prod_46184-1-large.jpg',
        nom: 'FLUOXETINE BIOGARAN 20mg',
        prix: 3.24,
        description: 'Un épisode dépressif modéré à sévère qui ne répond pas à une prise en charge psychothérapeutique d\'au moins 4 à 6 séances. Ce traitement antidépresseur ne devrait être proposé aux enfants et adolescents qu\'en association avec une prise en charge psychothérapeutique.',
        ordonnance: true,
        categorie: 'SANTE'
    },
]

class DrugsCatalog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedFilters : [
                "MEDICAMENTS"
            ],
            medicaments: tilesData
        }
    }

    filter = filterName => {
        const indexOfFilter = this.state.selectedFilters.indexOf(filterName)

        if (indexOfFilter < 0) {
            this.setState({
                selectedFilters: [...this.state.selectedFilters, filterName]
            })
        } else {
            this.setState({
                selectedFilters: eliminate(this.state.selectedFilters, indexOfFilter)
            })
        }
    }

    render() {
        return (
            <div style={styles.root}>
                <div className="bodyCatalogue" style={{ width: "100%" }}>

                    <div className="filtreCatalogue">
                        <ul className="filtreContainer">
                            {
                                filtresProduit.map(
                                    filtre => <li name={filtre} onClick={() => this.filter(filtre)} className={includes(this.state.selectedFilters, filtre) ? "selectedFilter" : "filter"}><span>{filtre}</span></li>)
                            }
                        </ul>
                    </div>
                </div>
                <div>
                    { this.state.selectedFilters.length === 0 && <h1 style={{ color: "red" }}>Aucun filtre séléctionné</h1> }
                    <GridList style={styles.gridList} cols={1} cellHeight={220}>
                        {
                            this.state.medicaments.map((medicament) => {
                                if (includes(this.state.selectedFilters, medicament.categorie)) {
                                    return <GridTile
                                        key={medicament.imgLink}
                                        title={medicament.nom}
                                        subtitle={<b style={{ color: "#bae584" }}>{medicament.prix.toFixed(2)}€</b>}
                                        actionIcon={<IconButton><AddShoppingCart color="green" /></IconButton>}
                                    >
                                        <img src={medicament.imgLink} />
                                    </GridTile>
                                }
                            }).filter(tile => tile)
                        }
                    </GridList>
                </div>
            </div>
        )
    }
}

export default DrugsCatalog