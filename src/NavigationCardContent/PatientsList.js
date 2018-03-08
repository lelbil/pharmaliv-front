import React, { Component } from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import moment from 'moment'

class OrdersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    getPatients () {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 100, [
                {
                    sex: 'M',
                    nom: 'Jon Snow',
                    birthDate: Date.parse('05-05-1987')/1000,
                    nss: '1 87 08 92 002 039 1',
                },
                {
                    sex: 'F',
                    nom: 'Rose Leslie',
                    birthDate: Date.parse('03-06-1997')/1000,
                    nss: '1 97 08 92 002 039 2',
                },
                {
                    sex: 'M',
                    nom: 'Jorah Mormont',
                    birthDate: Date.parse('12-21-1963')/1000,
                    nss: '1 63 08 92 002 039 1',
                },
                {
                    sex: 'M',
                    nom: 'Jon Snow',
                    birthDate: Date.parse('05-05-1987')/1000,
                    nss: '1 87 08 92 002 039 1',
                },
                {
                    sex: 'M',
                    nom: 'Jon Snow',
                    birthDate: Date.parse('05-05-1987')/1000,
                    nss: '1 87 08 92 002 039 1',
                },
                {
                    sex: 'M',
                    nom: 'Jon Snow',
                    birthDate: Date.parse('05-05-1987')/1000,
                    nss: '1 87 08 92 002 039 1',
                },
                {
                    sex: 'M',
                    nom: 'Jon Snow',
                    birthDate: Date.parse('05-05-1987')/1000,
                    nss: '1 87 08 92 002 039 1',
                },
                {
                    sex: 'M',
                    nom: 'Jon Snow',
                    birthDate: Date.parse('05-05-1987')/1000,
                    nss: '1 87 08 92 002 039 1',
                },
                {
                    sex: 'M',
                    nom: 'Jon Snow',
                    birthDate: Date.parse('05-05-1987')/1000,
                    nss: '1 87 08 92 002 039 1',
                },
            ])
        })
    }

    componentDidMount() {
        this.getPatients().then(
            data => this.setState({ data })
        )
    }

    render() {
        const columns = [
            {
                Header: 'Sexe',
                accessor: 'sex',
            },
            {
                Header: 'Nom',
                accessor: 'nom',
            },
            {
                Header: 'Date De Naissance',
                accessor: 'birthDate',
                Cell: props => <span>{moment.unix(props.value).format('DD-MM-YYYY')}</span>
            },
            {
                Header: 'Numéro de Sécurité Sociale',
                accessor: 'nss',
            },
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