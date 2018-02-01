import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import ArrowDropDownCircle from 'material-ui-icons/ArrowDropDownCircle'
import './Header.css'

const profileText = "Modifier mes infos"
const notifications = "0 Notifications"

class Header extends Component {
    render() {
        return (
            <div className="headerIndex">
                <div className="imgContainer">
                    <img className="profilePicture" id="profilePicture" alt="c'est toi" src="https://assets.entrepreneur.com/content/3x2/1300/20150406145944-dos-donts-taking-perfect-linkedin-profile-picture-selfie-mobile-camera-2.jpeg"/>
                </div>
                <div className="infoActions">
                    <div id="basicInfo" className="info">
                        <h1 className="basicInfo fullName">ATTOUCHI Billel</h1>
                        <h4 className="basicInfo birthday">17/06/1996</h4>
                        <h3 className="basicInfo socialSecurityNumber">1 96 78 54 997 456 92</h3>
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
                        <RaisedButton className="notificationsButton"primary={true} label={notifications}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header