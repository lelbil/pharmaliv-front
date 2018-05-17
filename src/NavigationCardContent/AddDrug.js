import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Checkbox from 'material-ui/Checkbox'
import Snackbar from 'material-ui/Snackbar'


import { tableBGColour, filtresProduit, API_URL } from '../JS/constants'

class AddDrug extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categorie: null,
            nom: '',
            description: '',
            imgLink: '',
            prix: '',
            ordonnance: false,
            snackbar: false,
        }
    }

    change = event => {
        const { name, value } = event.target
        const obj = {}
        obj[name] = value
        this.setState(obj)
    }

    changeCategory = (event, index, categorie) => {
        this.setState({ categorie })
    }

    ordonnance = () => {
        this.setState({ ordonnance: !this.state.ordonnance })
    }

    addDrug = () => {
        const body = JSON.stringify({
            categorie: this.state.categorie,
            nom: this.state.nom,
            description: this.state.description,
            imgLink: this.state.imgLink,
            ordonnance: this.state.ordonnance,
            inventaire: parseInt(this.state.inventaire),
            prix: parseFloat(this.state.prix)
        })

        fetch(`${API_URL}/medicament`, {
            method: 'POST',
            credentials: 'include',
            body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(() => {
                this.setState({
                    snackbar: true,
                    categorie: null,
                    nom: '',
                    description: '',
                    imgLink: '',
                    ordonnance: false,
                    prix: '',
                    inventaire: '',
                })
            })
            .catch(error => {
                console.log("ERROR", error)
            })
    }

    closeSnackbar = () => {
        this.setState({ snackbar: false })
    }

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center", backgroundColor: tableBGColour}}>
                <TextField value={this.state.nom} onChange={this.change} name="nom" hintStyle={{color: 'white'}} hintText="Nom du médicament"/>
                <TextField value={this.state.description} onChange={this.change} name="description" hintStyle={{color: 'white'}} hintText="Description"/>
                <TextField value={this.state.imgLink} onChange={this.change} name="imgLink" hintStyle={{color: 'white'}} hintText="URL de l'image"/>
                <TextField value={this.state.prix} onChange={this.change} name="prix" type="number" hintStyle={{color: 'white'}} hintText="Prix" step="0.01"/>
                <TextField value={this.state.inventaire} onChange={this.change} name="inventaire" type="number" hintStyle={{color: 'white'}} hintText="Inventaire"/>
                <Checkbox onCheck={this.ordonnance} checked={this.state.ordonnance} name="ordonnance" label="Ordonnance" labelStyle={{color: 'white'}} iconStyle={{fill: 'white'}} style={{ width: '20%' }}/>
                <SelectField
                    name={"categorie"}
                    onChange={this.changeCategory}
                    hintText="Catégorie"
                    value={this.state.categorie}
                    hintStyle={{color: 'white'}}
                >
                    {
                        filtresProduit.map(filtre =>
                            <MenuItem value={filtre} primaryText={filtre}/>
                        )
                    }
                </SelectField>

                <RaisedButton onClick={this.addDrug} label="Ajouter" primary={true}/>

                <Snackbar
                    open={this.state.snackbar}
                    message="Médicament ajouté avec succès"
                    autoHideDuration={2000}
                    onRequestClose={this.closeSnackbar}
                />
            </div>
        )
    }
}

export default AddDrug