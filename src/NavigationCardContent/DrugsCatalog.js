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

    notAllowedSnackbar = () => {
        this.setState({
            snackbarOrdonnance: true,
        });
    }

    closeNotAllowedSnackbar = () => {
        this.setState({
            snackbarOrdonnance: false,
        });
    }

    addToCartSnackbar = () => {
        this.setState({
            snackbarAddToCart: true,
        });
    }

    closeAddToCartSnackbar = () => {
        this.setState({
            snackbarAddToCart: false,
        });
    }

    addToCart = medicament => {
        if (medicament.ordonnance) {
            this.notAllowedSnackbar()
            return
        }
        //TODO: add medicament to cart ( medicament.id, quantity => call to API => user's cart )
        this.addToCartSnackbar()
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
                                                {!medicament.ordonnance && <input type="number" name="quantity" min="1" max="20" defaultValue={1}/>}
                                                <IconButton onClick={() => { this.addToCart(medicament) }} className={medicament.ordonnance ? "ordonnance" : ""}>
                                                    <AddShoppingCart className={medicament.ordonnance ? "ordonnance" : ""} disabled={true} color={medicament.ordonnance ? "grey" : "green"}/>
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
                    message="Médicament ajouté au panier"
                    autoHideDuration={2000}
                    onRequestClose={this.closeAddToCartSnackbar}
                />


            </div>
        )
    }
}

export default DrugsCatalog