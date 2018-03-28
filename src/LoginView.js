'use strict'

import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const style = {
    height: '70vh',
    width: '70vh',
    margin: 'auto',
    marginTop: '15vh',
    marginBottom: '15vh',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
};

/**
 * TODO: This view needs further styling:
 * 1. style a elements, you can get inspiration from https://vladimirponomarev.com/content/authentication-in-react-apps-1/initial-login-component.png
 * 2. Bigger Connexion title with another font, colour it too, and give it more space (margin++)
 * 3. Add Pharmaliv's logo (at the top left corner may be?)
 */
class LoginView extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Paper style={style} zDepth={5}>
                    <h1>Connexion</h1>
                    <Divider/>
                    <div style={{ display: "flex", flexDirection: "column", margin: "auto", }}>
                        <TextField floatingLabelText="Nom d'utilisateur"/>
                        <TextField floatingLabelText="Mot de Passe"/>
                        <RaisedButton label="Connexion" primary="true" style={{width: "fit-content", margin: "auto", marginTop:"50px"}}/>
                    </div>
                    <Divider style={{marginTop: "auto"}}/>
                    <span style={{margin: "20px 0px"}}><a href="#">Mot De Passe Oublié?</a> - <a href="#">Inscrivez-vous</a></span>
                </Paper>
            </MuiThemeProvider>
        )
    }
}

export default LoginView