import React, { Component } from 'react'
import ReactTable from "react-table";
import moment from 'moment'
import "react-table/react-table.css";
import RaisedButton from 'material-ui/RaisedButton'


class OrdersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    getOrders () {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 100, [
                {
                    date:  Date.parse('02-17-2018')/1000,
                    pharmacy: 'La pharmacie du bonheur',
                    doctor: 'Dr. Dre',
                    orderState: 'OK',
                    details: ['ERZ', 'MERZ', 'ERZ'],
                },
                {
                    date: Date.parse('02-18-2018')/1000,
                    pharmacy: 'Pharmacie du malheur',
                    doctor: 'Dr. Doctorissmo',
                    orderState: 'OK',
                    details: 'ERZ',
                },
                {
                    date:  Date.parse('02-19-2018')/1000,
                    pharmacy: 'Le 14ème',
                    doctor: 'Aucun',
                    orderState: 'Annulé',
                    details: 'ERZ',
                },
                {
                    date:  Date.parse('03-31-2018')/1000,
                    pharmacy: 'Pharmacie du malheur',
                    doctor: 'La Tour Eiffel',
                    orderState: 'En attente de livraison',
                    details: 'ERZ',
                },
                {
                    date:  Date.parse('03-31-2018')/1000,
                    pharmacy: 'Pharmacie du malheur',
                    doctor: 'La Tour Eiffel',
                    orderState: 'En attente de livraison',
                    details: 'ERZ',
                },
                {
                    date:  Date.parse('03-31-2018')/1000,
                    pharmacy: 'Pharmacie du malheur',
                    doctor: 'La Tour Eiffel',
                    orderState: 'En attente de livraison',
                    details: 'ERZ',
                },

            ])
        })
    }

    componentDidMount() {
        this.getOrders().then(
            data => this.setState({ data })
        )
    }

    render() {
        const columns = [{
                Header: 'Date',
                accessor: 'date',
                Cell: props => <span>{moment.unix(props.value).format('DD-MM-YYYY')}</span>
            },
            {
                Header: 'Pharmacie',
                accessor: 'pharmacy'
            },
            {
                Header: 'Médecin',
                accessor: 'doctor'
            },
            {
                Header: 'état',
                accessor: 'orderState'
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
            {
                Header: 'Actions',
                accessor: 'actions',
                Cell: () => ( //Todo: pass Order id in props so you can call functions on it
                    <span>
                        <RaisedButton label="Annuler" secondary={true}/>
                    </span>
                )
            }
        ]


        return (
            <div style={{backgroundColor: "pink", height: "100%", overflow: "scroll",}}>
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
                />
            </div>
        )
    }
}

export default OrdersList