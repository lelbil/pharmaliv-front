import React, { Component } from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import { tableBGColour, API_URL } from '../JS/constants'


class OrdersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        fetch(`${API_URL}/mesMedicaments`, {credentials: 'include'}).then(response => response.json())
            .then(data => {console.log('RECEIVED', data)
                this.setState({ data })
            })
            .catch(error => {
                console.log('ERROR', error)
            })
    }

    render() {
        const columns = [{
                Header: 'Nom',
                accessor: 'nom',
            },
            {
                Header: 'Catégorie',
                accessor: 'categorie',
            },
            {
                Header: 'Ordonnance',
                accessor: 'ordonnance',
                Cell: props => props.value ? "Obligatoire" : "Pas besoin"
            },
            {
                Header: 'Inventaire',
                accessor: 'inventaire',
            },
            {
                Header: 'Prix',
                accessor: 'prix',
                Cell: row => `${parseFloat(row.value).toFixed(2)} €`,
                sortMethod: (a, b) => (parseFloat(a) > parseFloat(b))? 1 : -1,
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