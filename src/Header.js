import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import ArrowDropDownCircle from 'material-ui-icons/ArrowDropDownCircle'
import './Header.css'
import history from './JS/history'

import { API_URL } from './JS/constants'

const profileText = "Modifier mes infos"
const notifications = "0 Notifications"

class Header extends Component {
    disconnect() {
        fetch(`${API_URL}/logout`, { credentials: 'include' })
            .then(response => {
                if (response.status !== 200) console.log('Received an unexpected response from API when trying to login')
                history.push('/') //This will redirect the user to the home page even if the logging out failed. So it's offering a degraded service but at least no errors
            })
            .catch(error => {
                console.log('ERROR WHEN CALLING LOGOUT ENDPOINT', error)
            })
    }

    render() {
        const session = this.props.sessionInfo
        return (
            <div className="headerIndex">
                <div className="imgContainer">
                    <img className="profilePicture" id="profilePicture" alt="c'est toi" src="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"/>
                </div>
                <div className="infoActions">
                    <div id="basicInfo" className="info">
                        <h1 className="basicInfo fullName">{session.prenom && session.nom && session.prenom + " " + session.nom}</h1>
                        <h1 className="basicInfo denomination">{session.denomination}</h1>
                        <h3 className="basicInfo socialSecurityNumber">{session.nss ? `Numéro de Sécurité Sociale: ${session.nss}` : null}</h3>
                        <h3 className="basicInfo siren">{session.siren ? `Siren: ${session.siren}` : null}</h3>
                    </div>
                    <div className="dropDownActions">
                        <IconMenu
                            iconButtonElement={<ArrowDropDownCircle/>}
                        >
                            <MenuItem primaryText={profileText}/>
                            <MenuItem primaryText={notifications}/>
                        </IconMenu>
                    </div>
                    <div id="actions" className="actions">
                        <RaisedButton className="profileButton" primary={true} label={profileText}/>
                        <RaisedButton className="notificationsButton" secondary={true} onClick={this.disconnect} label={"Déconnexion"}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header