import React, { Component } from 'react'
import ReactTable from "react-table";
import moment from 'moment'
import "react-table/react-table.css";
import RaisedButton from 'material-ui/RaisedButton'
import OpenWith from 'material-ui-icons/OpenWith'
import Dialog from 'material-ui/Dialog'
import { tableBGColour, API_URL } from '../JS/constants'

class OrdersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        let etat = null
        let route = null

        if (this.props.target === 'livreur') {
            route = 'deliveries'
            if (this.props.enCours) etat = 'prepared'
            else etat = 'postorder'
        }
        else if (this.props.target === 'pharmacie') {
            route = 'myPharmacyOrders'
            if (this.props.enCours) etat = 'ordered'
            else etat = 'postorder'
        }
        else if (this.props.target === 'medecin') {
            route = 'doctor'
            etat = 'all'
        }
        else {
            route = 'mymeds'
            etat= 'postorder'
        }

        if (route && etat) {
            fetch(`${API_URL}/${route}/${etat}`, {credentials: 'include'}).then(response => response.json())
                .then(data => {
                    this.setState({data})
                })
                .catch(error => {
                    console.log('ERROR', error)
                })
        } else {
            console.log('ERROR FETCHING ORDERS DATA! Can not get one of "etat" and "route"')
        }
    }

    action = (orderId, newEtat) => {
        //TODO: add a confirmation dialog maybe before proceeding
        const { target } = this.props
        const body = {}

        if (target === 'pharmacie' || target === 'livreur' || target === 'patient') {
            body.etat = newEtat
        }
        else {
            console.log('Need target to confirm order')
            return
        }

        fetch(`${API_URL}/order/${orderId}`, {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status === 204) {
                    if (target === 'pharmacie') {
                        this.setState({ data: this.state.data.filter(el => el.commandeId !== orderId) })
                    } else if (target === 'livreur') {
                        this.componentDidMount()
                    }
                }
                else {
                    console.log('There has been a problem while confirming order from cart, no rows affected')
                }
            })
            .catch(error => {
                console.log("ERROR", error)
            })

    }

    showOrdonnanceDialog = ordonnanceURL => {
        this.setState({ ordonnanceURL, ordonnanceDialog: true })

    }

    closeDialog = () => {
        this.setState({ordonnanceDialog: false,})
    }

    render() {
        const columns = [{
                Header: 'Date',
                accessor: 'date',
                Cell: props => <span>{moment.unix(props.value).format('DD-MM-YYYY')}</span>
            },
        ]

        const etatMapping = {
            ['ordered']: 'Confirmée',
            ['prepared']: 'Prête pour livraison',
            ['accepted']: 'En attente du livreur',
            ['pickedup']: 'En chemin',
            ['delivered']: 'Livrée',
            ['canceled']: 'Annulée par le client',
            ['rejected']: 'Réfusé par le pharmacien',
            ['deliveryProblem']: 'Problème lors de la livraison',
        }

        if (this.props.target !== "medecin") {
            columns.push({
                Header: 'Détails',
                accessor: 'details',
                Cell: props => (
                    Array.isArray(props.value) ?
                        <ol style={{ margin: "0px"}}>
                            {props.value.map(drug => <li>{drug}</li>)}
                        </ol>
                        :
                        props.value
                )
            },)
        }

        if (this.props.target === "medecin") {
            columns.push({
                    Header: 'Pharmacie',
                    accessor: 'pharmacy',
                },
                {
                    Header: 'Patient',
                    accessor: 'nom',
                })
        }

        if (this.props.target === "patient") {
            columns.push({
                Header: 'Pharmacie',
                accessor: 'pharmacy',
            }, {
                Header: 'Adresse de la pharmacie',
                accessor: 'pharmacyAddress',
            })
        }

        if (this.props.target === "pharmacie") {
            columns.push({
                Header: 'Nom Client',
                accessor: 'nom',
            }, {
                Header: 'Adresse',
                accessor: 'address',
            })
        }

        if (this.props.target !== "livreur") {
            columns.push({
                Header: 'Ordonnance',
                accessor: 'ordonnanceURL',
                Cell: ({ value }) => {
                    if (value && value !== '' ) return <OpenWith style={{color: '#0000cc', cursor: 'pointer', marginRight: '8px'}}
                                  onClick={() => {
                                      this.showOrdonnanceDialog(value)
                                  }}/>
                    else return 'Aucune ordonnance'
                }
            },
            {
                Header: 'Modalité',
                accessor: 'type',
            })
        }

        if (this.props.target === "livreur") {
            columns.push({
                Header: 'Nom',
                id: 'name',
                accessor: d => d.etat === 'pickedup'? d.nom : d.pharmacy
            }, {
                Header: 'Adresse',
                id: 'address',
                accessor: d => d.etat === 'pickedup'? d.patientAddress : d.pharmacyAddress
            })
        }

        else if (!this.props.enCours) {
            columns.push({
                Header: 'État',
                accessor: 'etat',
                Cell: ({ value }) => etatMapping[value]
            })
        }

        if (this.props.enCours || this.props.target === 'patient') {
            columns.push({
                Header: 'Actions',
                accessor: 'actions',
                Cell: ({ original }) => {
                    let acceptEtat = null
                    let declineEtat = null
                    let acceptLabel = null
                    let declineLabel = null

                    if (this.props.target === 'pharmacie') {
                        acceptEtat = 'prepared'
                        declineEtat = 'rejected'
                        acceptLabel = 'PRÊT'
                        declineLabel = 'rejeter'
                    }
                    else if (this.props.target === 'livreur') {
                        if (original.etat === 'prepared') {
                            acceptEtat = 'accepted'
                            acceptLabel = 'Choisir'
                        }
                        else if (original.etat === 'accepted' ) {
                            acceptEtat = 'pickedup'
                            declineEtat = 'deliveryProblem'
                            acceptLabel = 'Récupérée'
                            declineLabel = 'Récupération Impossible'
                        }
                        else if (original.etat === 'pickedup') {
                            acceptEtat = 'delivered'
                            declineEtat = 'deliveryProblem'
                            acceptLabel = 'Livré'
                            declineLabel = 'Problème!'
                        }
                    }
                    else if (this.props.target === 'patient') {
                        declineEtat = 'canceled'
                        declineLabel = 'Annuler'
                    }

                    return <span>
                        {this.props.target !== 'patient' && <RaisedButton onClick={() => {
                            this.action(original.commandeId, acceptEtat)
                        }} label={acceptLabel || "Confirmer"} primary={true}/>}
                        {
                            (this.props.target === "pharmacie" ||
                            (this.props.target === "patient" && (original.etat === 'ordered' || original.etat === 'prepared')) ||
                            (
                                this.props.target === "livreur" && (original.etat === 'accepted' || original.etat === 'pickedup')
                            ))
                            &&
                            <RaisedButton onClick={() => {
                                this.action(original.commandeId, declineEtat)
                            }} label={ declineLabel || "Annuler" } secondary={true}/>}
                    </span>
                }
            })
        }

        return (
            <div style={{backgroundColor: tableBGColour, height: "100%", overflow: "scroll",}}>
                <ReactTable
                    data={this.state.data}
                    columns={columns}
                    showPaginationTop={true}
                    defaultPageSize={5}
                    previousText= 'Précedent'
                    nextText= 'Suivant'
                    loadingText= 'Chargement...'
                    noDataText= 'Aucune donnée'
                    pageText= 'Page'
                    ofText= 'sur'
                    rowsText= 'lignes'
                    className="-striped -highlight"
                />
                <Dialog
                    open={this.state.ordonnanceDialog}
                    onRequestClose={this.closeDialog}
                >
                    <img style={{ objectFit: 'cover', height: '-webkit-fill-available' }} src={this.state.ordonnanceURL} alt="Ordonnance"/>
                </Dialog>
            </div>
        )
    }
}

export default OrdersList