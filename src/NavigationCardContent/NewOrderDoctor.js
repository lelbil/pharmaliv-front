import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class NewOrderDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            drug: null,
            patient: null,
        }
    }

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center"}}>
                <TextField hintText="Nom du patient"/>
                <TextField hintText="Medicaments (Chaque médicaments dans une nouvelle line)" multiLine={true} rows={4} rowsMax={6}/>
                <RaisedButton label="Commander" primary={true}/>
            </div>
        )
    }
}

export default NewOrderDoctor