import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import Snackbar from 'material-ui/Snackbar'
import {API_URL, tableBGColour} from '../JS/constants'

class AddDrug extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lname: null,
            fname: null,
            dob: null,
            email: null,
            nss: null,
            address: null,
        }
    }

    signup = () => {
        const body = JSON.stringify(
            {
                ...this.state,
                type: 'patientContent',
                user: `${this.state.fname}.${this.state.lname}`.toLocaleLowerCase(),
                password: 'lg5evI09v', //Todo: make a hash
            })

        delete body.snackbar

        fetch(`${API_URL}/signup`, {
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
                    lname: '',
                    fname: '',
                    dob: '',
                    email: '',
                    nss: '',
                    address: '',
                    snackbar: true,
                })
            })
            .catch(error => {
                console.log("ERROR", error)
            })
    }

    change = e => {
        const { name, value } = e.target
        const obj = {}
        obj[name] = value
        this.setState(obj)
    }

    changeDate = (event, dob) => {
        this.setState({
            dob
        })
    }

    closeSnackbar = () => this.setState({ snackbar: false })

    render() {
        return (
            <div>
                <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center", backgroundColor: tableBGColour}}>
                    <TextField name="lname" value={this.state.lname} onChange={this.change} hintStyle={{color: 'white'}} hintText="Nom du patient"/>
                    <TextField name="fname" value={this.state.fname} onChange={this.change} hintStyle={{color: 'white'}} hintText="Prénom du patient"/>
                    <TextField name="nss" value={this.state.nss} onChange={this.change} hintStyle={{color: 'white'}} hintText="Numéro De Sécurité Sociale"/>
                    <TextField name="email" value={this.state.email} onChange={this.change} hintStyle={{color: 'white'}} hintText="Émail"/>
                    <TextField name="address" onChange={this.change} value={this.state.address} hintStyle={{color: 'white'}} hintText="Adresse Complète"/>
                    <DatePicker onChange={this.changeDate} value={this.state.dob} hintStyle={{color: 'white'}} hintText="Date De Naissance" openToYearSelection={true}/>

                    <RaisedButton onClick={this.signup} label="Ajouter" primary={true}/>
                </div>
                <Snackbar
                    open={this.state.snackbar}
                    message={`Compte du patient créé`}
                    autoHideDuration={2000}
                    onRequestClose={this.closeSnackbar}
                />
            </div>
        )
    }
}

export default AddDrug