import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import DatePicker from 'material-ui/DatePicker'
import history from './JS/history'

import { API_URL } from './JS/constants'

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
            password: '',
            profilePic: null,
        }
    }

    componentDidMount() {
        const { type, isUpdate, info } = this.props
        if (isUpdate && type) {
            this.setState({ type, ...info })
        }
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

    signup = () => {
        const body = JSON.stringify(this.state)

        fetch(`${API_URL}/signup?userId=${this.props.userId}&userInfoId=${this.props.userInfoId}`, {
            method: this.props.isUpdate ? 'PUT' : 'POST',
            credentials: 'include',
            body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(() => {
                history.push('/')
            })
            .catch(error => {
                console.log("ERROR", error)
            })
    }

    chooseType(type){
        this.setState({ type })
    }

    handleProfilePic = e => {
        const file = e.target.files[0]

        this.uploadToS3(file).then(profilePic => {
            this.setState({
                profilePic
            })
        })

    }

    getSignedRequest = file => {
        return fetch(`${API_URL}/sign-s3?fileName=${file.name}&fileType=${file.type}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`)
                }
                return response.json()
            })
    }

    uploadFile = (file, signedRequest, url) => {
        const options = {
            method: 'PUT',
            body: file,
        }
        return fetch(signedRequest, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                return url
            })
    }

    uploadToS3 = file => {
        return this.getSignedRequest(file)
            .then(json => this.uploadFile(file, json.signedRequest, json.url))
            .then(url => {
                return url
            })
            .catch(err => {
                console.error(err)
                return null
            })
    }

    render() {
        const { type } = this.state
        const { isUpdate } = this.props
        return (
            <MuiThemeProvider>
                <Paper zDepth={isUpdate ? 0 : 5} style={isUpdate ? {textAlign: 'center', display: 'flex', flexDirection: 'column',} : style}>
                    {!isUpdate && <h1>Inscription</h1>}
                    {!isUpdate && <Divider/>}
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
                            <TextField name="password" onChange={this.change} value={this.state.password} hintText="Mot de Passe" type="password"/>
                            {type === "patientContent" && <div><span>Photo de profil: &nbsp;&nbsp;</span><input onChange={this.handleProfilePic} type="file" id="profilepic"/></div>}
                            {type !== "pharmacistContent" && <TextField name="fname" onChange={this.change} value={this.state.fname} hintText="Prénom"/> }
                            {type !== "pharmacistContent" && <TextField name="lname" onChange={this.change} value={this.state.lname} hintText="Nom"/> }
                            {type === "pharmacistContent" && <TextField name="pharmaName" onChange={this.change} value={this.state.pharmaName} hintText="Nom de la Pharmacie"/> }
                            {type === "pharmacistContent" && <TextField name="siren" onChange={this.change} value={this.state.siren} hintText="SIREN"/> }
                            {type === "deliveryManContent" && <TextField name="deliveryCompany" onChange={this.change} value={this.state.deliveryCompany} hintText="Nom de la Société de Livraison"/> }
                            {type === "patientContent" && <DatePicker style={{alignSelf: "flex-start"}} value={this.state.dob} onChange={this.changeDate} hintText="Date De Naissance" openToYearSelection={true} autoOk={true} minDate={new Date('01-01-1900')} maxDate={new Date('01-01-2006')}/>}
                            <TextField name="address" onChange={this.change} value={this.state.address} hintText="Adresse Complète"/>
                            <TextField name="email" onChange={this.change} value={this.state.email} hintText="Courriel (é-mail)"/>
                            <TextField name="tel" onChange={this.change} value={this.state.tel} hintText="Numéro de téléphone"/>
                            {type === "patientContent" && <TextField name="nss" onChange={this.change} value={this.state.nss} hintText="Numéro de Sécurité Sociale"/>}
                            <RaisedButton onClick={this.signup} label={ isUpdate? 'Enregistrer' : "Inscription"} primary={true} style={{width: "fit-content", margin: "auto", marginTop:"20px"}}/>
                        </div>
                    }
                    { !isUpdate && <Divider style={{marginTop: "auto"}}/>}
                    { !isUpdate && <span style={{margin: "20px 0px"}}><a href="#">Mot De Passe Oublié?</a> - <a href="/login">Déjà inscris?</a></span>}
                </Paper>
            </MuiThemeProvider>
        )
    }
}

export default RegisterView