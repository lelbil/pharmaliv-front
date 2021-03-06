import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
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
class LoginView extends Component {
    constructor() {
        super()
        this.state = {
            user: '',
            pw: '',
        }
    }

    handleKeyPress = event => {
        if(event.key === 'Enter'){
            this.authenticate()
        }
    }

    change = e => {
        const { name, value } = e.target
        const obj = {}
        obj[name] = value
        this.setState(obj)
    }

    authenticate = () => {
        const body = JSON.stringify({
            user: this.state.user,
            password: this.state.pw
        })
//TODO: print error when login fails (wrong user/password)
        fetch(`${API_URL}/login`, {
            method: 'POST',
            credentials: 'include',
            body,
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },})
            .then(response => response.json())
            .then(() => {
                history.push('/')
            })
            .catch(error => {
                console.log("ERROR", error)
            })
    }

    render() {
        return (
            <MuiThemeProvider>
                <Paper style={style} zDepth={5}>
                    <h1>Connexion</h1>
                    <Divider/>
                    <div style={{ display: "flex", flexDirection: "column", margin: "auto", }}>
                        <TextField onKeyPress={this.handleKeyPress} name="user" onChange={this.change} value={this.state.user} floatingLabelText="Nom d'utilisateur"/>
                        <TextField onKeyPress={this.handleKeyPress} name="pw" onChange={this.change} value={this.state.pw} floatingLabelText="Mot de Passe" type="password"/>
                        <RaisedButton onClick={this.authenticate} label="Connexion" primary={true} style={{width: "fit-content", margin: "auto", marginTop:"50px"}}/>
                    </div>
                    <Divider style={{marginTop: "auto"}}/>
                    <span style={{margin: "20px 0px"}}><a href="#">Mot De Passe Oublié?</a> - <a href="/register">Inscrivez-vous</a></span>
                </Paper>
            </MuiThemeProvider>
        )
    }
}

export default LoginView