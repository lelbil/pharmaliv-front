import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import Divider from 'material-ui/Divider'
import ArrowDropDownCircle from 'material-ui-icons/ArrowDropDownCircle'
import RemoveCircle from 'material-ui-icons/RemoveCircle'
import './Header.css'
import history from './JS/history'
import RegisterView from './RegisterView'

import { API_URL } from './JS/constants'
import { getExactInfo } from './JS/utils'

const profileText = "Modifier mes infos"
const logout = "Déconnexion"
const cart = "Mon panier"

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            panier: [],
            panierOpen: false,
            modifyMyInfo: false,
        }
    }

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

    openPanier = () => {
        fetch(`${API_URL}/cart`, { credentials: 'include'})
            .then(response => response.json())
            .then(panier => {
                this.setState({ panier, panierOpen: true })
            })
            .catch(error => {
                //Open panier anyway, it will show previously fetched products or nothing, but at least it will respond
                this.setState({ panierOpen: true })
                console.log('ERROR GETTING CART INFO', error)
            })
    }

    openModifyMyInfo = () => {
        fetch(`${API_URL}/info`, { credentials: 'include'})
            .then(response => response.json())
            .then(info => {
                const myInfo = getExactInfo(info)

                this.setState({
                    modifyMyInfo: true,
                    myInfo,
                    userId: info.userId,
                    userInfoId: info.id,
                })
            })
            .catch(error => {
                console.log('ERROR GETTING MY INFO', error)
            })
    }

    closeDialog = () => {
        this.setState({ panierOpen: false, modifyMyInfo: false })
    }

    confirmCart = () => {//TODO: should have some sort of redirection to a payment page
        const body = JSON.stringify(this.state.panier)

        fetch(`${API_URL}/order`, {
            method: 'POST',
            credentials: 'include',
            body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (response.status === 200 ) {
                this.setState({
                    panier: [],
                    panierOpen: false,
                })
                //TODO: Why not add a snackbar to say that it was ordered just fine?
            }
            else {
                console.log('GOT UNEXPECTED RESPONSE STATUS CODE WHEN TRYING TO ORDER')
            }
        })
        .catch(error => {
            console.log("ERROR", error)
        })
    }

    deleteItemFromCart = productId => {
        fetch(`${API_URL}/cart/${productId}`, { method: 'DELETE', credentials: 'include'})
            .then(response => response.json())
            .then(result => {
                if (result === 1) {
                    this.setState({ panier: this.state.panier.filter(el => el.panier_id !== productId) })
                } else {
                    console.log('There has been a problem while deleting element from cart, no rows affected')
                }
            })
            .catch(error => {
                console.log('ERROR DELETING ELEMENT FROM CART', error)
            })
    }

    render() {
        const session = this.props.sessionInfo
        const actions = [
            <RaisedButton
                label="Fermer le panier"
                secondary={true}
                onClick={this.closeDialog}
            />,
            <RaisedButton
                label="Confirmer la commande"
                primary={true}
                keyboardFocused={true}
                onClick={this.confirmCart}
            />,
        ]

        return (
            <div className="headerIndex">
                <div className="imgContainer">
                    <img className="profilePicture" id="profilePicture" alt="c'est toi" src={session.profilePic}/>
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
                            <MenuItem onClick={this.openModifyMyInfo} primaryText={profileText}/>
                            <MenuItem onClick={this.openPanier} primaryText={cart}/>
                            <MenuItem onClick={this.disconnect} primaryText={logout}/>
                        </IconMenu>
                    </div>
                    <div id="actions" className="actions">
                        <RaisedButton className="profileButton" primary={true} label={profileText} onClick={this.openModifyMyInfo}/>
                        <RaisedButton className="cart" primary={true} label={cart} onClick={this.openPanier}/>
                        <RaisedButton className="notificationsButton" secondary={true} onClick={this.disconnect} label={logout}/>
                    </div>
                </div>
                <Dialog
                    title={`Mon Panier (${this.state.panier.length} elements)`}
                    actions={actions}
                    open={this.state.panierOpen}
                    onRequestClose={this.closeDialog}
                >
                    {
                        this.state.panier.map(product => <div>
                            <h2>
                                <RemoveCircle style={{ color: '#cc0000', cursor: 'pointer', marginRight: '8px'}} onClick={() => {this.deleteItemFromCart(product.panier_id)}}/>
                                <span>{product.nom}</span>
                                <span style={{ float: "right", fontSize: '14px' }}>{parseFloat(product.prix).toFixed(2)}€ x {product.quantite} =
                                    <b style={{fontSize: '25px'}}>{parseFloat(product.prix * product.quantite).toFixed(2)}€</b>
                                </span>
                            </h2>
                            <Divider/>
                        </div>)
                    }
                    <h1 style={{ float: 'right', marginTop: '30px', marginBottom: '0px' }}>TOTAL: {parseFloat(this.state.panier.reduce((acc, { prix, quantite }) => acc + prix * quantite, 0)).toFixed(2)}€</h1>
                </Dialog>
                <Dialog
                    title='Modifier Mes Infos'
                    open={this.state.modifyMyInfo}
                    onRequestClose={this.closeDialog}
                >
                    <RegisterView isUpdate={true} type={session.type} info={this.state.myInfo} userId={this.state.userId} userInfoId={this.state.userInfoId} />
                </Dialog>
            </div>
        )
    }
}

export default Header