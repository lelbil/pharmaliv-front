import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { tableBGColour } from '../JS/constants'

class AddDrug extends Component {
    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center", backgroundColor: tableBGColour}}>
                <TextField hintStyle={{color: 'white'}} hintText="Nom du médicament"/>
                <TextField hintStyle={{color: 'white'}} hintText="Type"/>
                <TextField hintStyle={{color: 'white'}} hintText="Contenu"/>
                <TextField hintStyle={{color: 'white'}} hintText="Inventaire"/>
                <TextField hintStyle={{color: 'white'}} hintText="Remarques"/>
                <RaisedButton label="Ajouter" primary={true}/>
            </div>
        )
    }
}

export default AddDrug