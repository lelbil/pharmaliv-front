import React, { Component } from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from 'moment'
import {API_URL, tableBGColour} from '../JS/constants'

class OrdersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        fetch(`${API_URL}/mesPatients`, {credentials: 'include'}).then(response => response.json())
            .then(data => {
                this.setState({ data: data.map(patient => {return {...patient, dob: Date.parse(patient.dob)/1000}}) })
            })
            .catch(error => {
                console.log('ERROR', error)
            })
    }

    render() {
        const columns = [
            {
                Header: 'Prénom',
                accessor: 'prenom',
            },
            {
                Header: 'Nom',
                accessor: 'nom',
            },
            {
                Header: 'Date De Naissance',
                accessor: 'dob',
                Cell: props => <span>{moment.unix(props.value).format('DD-MM-YYYY')}</span>
            },
            {
                Header: 'Numéro de Sécurité Sociale',
                accessor: 'nss',
            },
            {
                Header: 'Émail',
                accessor: 'email',
            },
            {
                Header: 'Numéro de téléphone',
                accessor: 'tel',
            },
        ]

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