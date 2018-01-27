import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
    index: {
        display: "flex",
        alignItems: "center",
        //backgroundColor: "white",
        width: "100%"
    },
    profilePicture: {
        width: "21vh",
        height: "21vh",
        borderRadius: "50%",
    },
    imgContainer: {
        flex: 1,
    },
    info: {
        flex: 3,
    },
    actions: {
        flex: 2,
        height: "65%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
}

class Header extends Component {
    render() {
        return (
            <div style={styles.index}>
                <div style={styles.imgContainer}>
                    <img style={styles.profilePicture} id="profilePicture" alt="c'est toi" src="https://assets.entrepreneur.com/content/3x2/1300/20150406145944-dos-donts-taking-perfect-linkedin-profile-picture-selfie-mobile-camera-2.jpeg"/>
                </div>
                <div id="basicInfo" style={styles.info}>
                    <h1>ATTOUCHI Billel</h1>
                    <h4>17/06/1996</h4>
                    <h3>1 96 78 54 997 456 92</h3>
                </div>
                <div id="actions" style={styles.actions}>
                    <RaisedButton style={{ marginRight: "50px"}} primary={true} label={"Modifier mes infos"}/>
                    <RaisedButton style={{ marginLeft: "50px"}} primary={true} label={"0 Notifications"}/>
                </div>
            </div>
        )
    }
}

export default Header