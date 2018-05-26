import React, { Component } from 'react'
import ReactTable from "react-table";
import moment from 'moment'
import "react-table/react-table.css";
import RaisedButton from 'material-ui/RaisedButton'
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
        } else {
            route = 'myPharmacyOrders'
            if (this.props.enCours) etat = 'ordered'
            else etat = 'postorder'
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

    render() {
        const columns = [{
                Header: 'Date',
                accessor: 'date',
                Cell: props => <span>{moment.unix(props.value).format('DD-MM-YYYY')}</span>
            }, {
                Header: 'Nom Client',
                accessor: 'nom',
            }, {
                Header: 'Adresse',
                accessor: 'address',
            },
            {
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
            },
        ]
        
        if (this.props.target == "livreur") {
            columns.push({
                Header: 'Pharmacie',
                accessor: 'pharmacy'
            }, {
                Header: 'Adresse Pharmacie',
                accessor: 'pharmacyAddress'
            })
        }

        if (this.props.enCours) {
            columns.push({
                Header: 'Actions',
                accessor: 'actions',
                Cell: () => ( //Todo: pass Order id in props so you can call functions on it
                    <span>
                        <RaisedButton label="Confirmer" primary={true}/>
                        {this.props.target === "pharmacie" && <RaisedButton label="Annuler" secondary={true}/>}
                    </span>
                )
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
            </div>
        )
    }
}

export default OrdersList