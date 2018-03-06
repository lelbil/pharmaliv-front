import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class AddDrug extends Component {
    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center"}}>
                <TextField hintText="Nom du médicament"/>
                <TextField hintText="Type"/>
                <TextField hintText="Contenu"/>
                <TextField hintText="Inventaire"/>
                <TextField hintText="Remarques"/>
                <RaisedButton label="Ajouter" primary={true}/>
            </div>
        )
    }
}

export default AddDrug