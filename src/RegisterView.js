import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import history from './JS/history'

const style = {
    height: '70vh',
    width: '70vh',
    margin: 'auto',
    marginTop: '15vh',
    marginBottom: '15vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
}

/**
 * TODO: This view needs further styling:
 * 1. style a elements, you can get inspiration from https://vladimirponomarev.com/content/authentication-in-react-apps-1/initial-login-component.png
 * 2. Bigger Connexion title with another font, colour it too, and give it more space (margin++)
 * 3. Add Pharmaliv's logo (at the top left corner may be?)
 */
class RegisterView extends Component {
    constructor() {
        super()
        this.state = {
            type: null,
            user: '',
            pw: '',
        }
    }

    change = e => {
        const { name, value } = e.target
        const obj = {}
        obj[name] = value
        this.setState(obj)
    }

    signup = () => {
        //TODO 1- Call register endpoint. 2- redirect to /app sending the user type in props

        const { type } = this.state

        if (type) history.push('/app', { type })

        else alert("Signup failed") //TODO
    }

    chooseType(type){
        this.setState({ type })
    }

    render() {
        const { type } = this.state
        return (
            <MuiThemeProvider>
                <Paper style={style} zDepth={5}>
                    <h1>Inscription</h1>
                    <Divider/>
                    {!type &&
                        <div style={{ display: "flex", flexDirection: "column", margin: "auto", }}>
                            <h1>Je suis:</h1>
                            <RaisedButton onClick={() => {this.chooseType("patientContent")}} style={{margin: "1.2vh"}} label="Patient" primary={true}/>
                            <RaisedButton onClick={() => {this.chooseType("doctorContent")}} style={{margin: "1.2vh"}} label="Medecin" primary={true}/>
                            <RaisedButton onClick={() => {this.chooseType("pharmacistContent")}} style={{margin: "1.2vh"}} label="Pharmacien" primary={true}/>
                            <RaisedButton onClick={() => {this.chooseType("deliveryManContent")}} style={{margin: "1.2vh"}} label="Livreur" primary={true}/>
                        </div>
                    }
                    { type &&
                        <div style={{ display: "flex", flexDirection: "column", margin: "auto", overflow: "scroll"}}>
                            <TextField name="user" onChange={this.change} value={this.state.user} hintText="Nom d'utilisateur"/>
                            <TextField name="pw" onChange={this.change} value={this.state.pw} hintText="Mot de Passe" type="password"/>
                            {type !== "pharmacistContent" && <TextField name="fname" onChange={this.change} value={this.state.fname} hintText="Prénom"/> }
                            {type !== "pharmacistContent" && <TextField name="lname" onChange={this.change} value={this.state.lname} hintText="Nom"/> }
                            {type === "pharmacistContent" && <TextField name="pharmaName" onChange={this.change} value={this.state.pharmaName} hintText="Nom de la Pharmacie"/> }
                            {type === "pharmacistContent" && <TextField name="siren" onChange={this.change} value={this.state.siren} hintText="SIREN"/> }
                            {type === "deliveryManContent" && <TextField name="deliveryCompany" onChange={this.change} value={this.state.deliveryCompany} hintText="Npm de la Société de Livraison"/> }
                            {type === "patientContent" && <DatePicker name="dob" onChange={this.change} hintText="Date De Naissance" openToYearSelection={true} autoOk={true} minDate={new Date('01-01-1900')} maxDate={new Date('01-01-2005')}/>}
                            <TextField name="address" onChange={this.change} value={this.state.address} hintText="Adresse Complète"/>
                            <TextField name="email" onChange={this.change} value={this.state.email} hintText="Courriel (é-mail)"/>
                            <TextField name="tel" onChange={this.change} value={this.state.tel} hintText="Numéro de téléphone"/>
                            {type === "patientContent" && <TextField name="nss" onChange={this.change} value={this.state.nss} hintText="Numéro de Sécurité Sociale"/>}
                            <RaisedButton onClick={this.signup} label="Inscription" primary="true" style={{width: "fit-content", margin: "auto", marginTop:"20px"}}/>
                        </div>
                    }
                    <Divider style={{marginTop: "auto"}}/>
                    <span style={{margin: "20px 0px"}}><a href="#">Mot De Passe Oublié?</a> - <a href="/login">Déjà inscris?</a></span>
                </Paper>
            </MuiThemeProvider>
        )
    }
}

export default RegisterView