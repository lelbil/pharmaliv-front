import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import Checkbox from 'material-ui/Checkbox'
import { tableBGColour } from '../JS/constants'

class AddDrug extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sex: null
        }
    }

    check (sex) {
        this.setState({ sex })
    }

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center", backgroundColor: tableBGColour}}>
                <TextField hintStyle={{color: 'white'}} hintText="Nom complet du patient"/>
                <TextField hintStyle={{color: 'white'}} hintText="Numéro De Sécurité Sociale"/>
                <TextField hintStyle={{color: 'white'}} hintText="Sexe"/>
                <DatePicker hintStyle={{color: 'white'}} hintText="Date De Naissance" openToYearSelection={true}/>
                <div>
                    <Checkbox onCheck={() => {this.check("f")}} checked={this.state.sex === 'f'} label="Femme"/>
                    <Checkbox onCheck={() => {this.check("m")}} checked={this.state.sex === 'm'} label="Homme"/>
                </div>
                <RaisedButton label="Ajouter" primary={true}/>
            </div>
        )
    }
}

export default AddDrug