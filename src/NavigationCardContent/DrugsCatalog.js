import React, { Component } from 'react'
import {GridList, GridTile} from 'material-ui/GridList'
import { AddShoppingCart } from 'material-ui-icons'
import { IconButton } from 'material-ui'
import { Snackbar } from 'material-ui'

import { filtresProduit, API_URL } from '../JS/constants'
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

class DrugsCatalog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedFilters : [
                "MEDICAMENTS"
            ],
            medicaments: [],
            snackbarOrdonnance: false,
            snackbarAddToCart: false,
        }
    }

    componentDidMount() {
        fetch(`${API_URL}/medicament`, {credentials: 'include'}).then(response => response.json())
            .then(medicaments => {
                this.setState({ medicaments })
            })
            .catch(error => {
                console.log('ERROR', error)
            })
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

    addToCartSnackbar = ({ordonnance = false}) => {
        this.setState({
            snackbarAddToCart: true,
            snackbarOrdonnance: ordonnance,
        });
    }

    closeAddToCartSnackbar = () => {
        this.setState({
            snackbarAddToCart: false,
            snackbarOrdonnance: null,
        });
    }

    addToCart = medicament => {
        const body = JSON.stringify({
            quantite: document.getElementById(`quantite${medicament.id}`).value,
            medicamentId: medicament.id,
        })

        fetch(`${API_URL}/addToCart`, {
            method: 'POST',
            credentials: 'include',
            body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status === 201) this.addToCartSnackbar({ ordonnance: medicament.ordonnance })
                else { console.log('ERROR WHILE ADDING ITEM TO CART') }
            })
            .catch(error => {
                console.log("ERROR", error)
            })
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
                    { this.state.selectedFilters.length !== 0 && this.state.medicaments.filter(medi => this.state.selectedFilters.indexOf(medi.categorie) >= 0).length === 0 && <h1 style={{ color: "red" }}>Aucun médicament répondant aux critères</h1> }
                    <GridList style={styles.gridList} cols={1} cellHeight={220}>
                        {
                            this.state.medicaments.map((medicament) => {
                                if (includes(this.state.selectedFilters, medicament.categorie)) {
                                    return <GridTile
                                        key={medicament.imgLink}
                                        title={medicament.nom}
                                        subtitle={<b style={{ color: "#bae584" }}>{parseFloat(medicament.prix).toFixed(2)}€</b>}
                                        actionIcon={
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <input id={`quantite${medicament.id}`} type="number" name="quantity" min="1" max="20" defaultValue={1}/>
                                                <IconButton onClick={() => { this.addToCart(medicament) }}>
                                                    <AddShoppingCart disabled={true} color="green"/>
                                                </IconButton>
                                            </div>}
                                    >
                                        <img src={medicament.imgLink} />
                                    </GridTile>
                                }
                            }).filter(tile => tile)
                        }
                    </GridList>
                </div>

                <Snackbar
                    open={this.state.snackbarOrdonnance}
                    message="Ordonnance obligatoire!"
                    autoHideDuration={2000}
                    onRequestClose={this.closeNotAllowedSnackbar}
                />

                <Snackbar
                    open={this.state.snackbarAddToCart}
                    message={`Médicament ajouté au panier ${this.state.snackbarOrdonnance ? '(Ordonnance obligatoire!)' : ''}`}
                    autoHideDuration={2000}
                    onRequestClose={this.closeAddToCartSnackbar}
                />


            </div>
        )
    }
}

export default DrugsCatalog