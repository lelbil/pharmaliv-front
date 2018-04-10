import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import { tableBGColour } from '../JS/constants'

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
            <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center", backgroundColor: tableBGColour}}>
                {this.props.target === "medecin" && <TextField hintStyle={{color: 'white'}} hintText="Nom du patient"/>}
                {this.props.target === "patient" && <TextField hintStyle={{color: 'white'}} hintText="Pharmacie"/>}
                <TextField hintStyle={{color: 'white'}} hintText="Médicaments (Chaque médicaments dans une nouvelle line)" multiLine={true} rows={4} rowsMax={6}/>
                <RaisedButton label="Commander" primary={true}/>
            </div>
        )
    }
}

export default NewOrderDoctor