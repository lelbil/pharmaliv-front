import React, { Component } from 'react'
import ReactTable from "react-table";
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
                    nom: 'Doliprane 100mg',
                    type: 'Comprimés',
                    contenu: '8 comprimés',
                    inventaire: '253',
                    remarques: 'Aucune'
                },
                {
                    nom: 'Doliprane 100mg',
                    type: 'Comprimés',
                    contenu: '8 comprimés',
                    inventaire: '253',
                    remarques: 'Aucune'
                },
                {
                    nom: 'Doliprane 100mg',
                    type: 'Comprimés',
                    contenu: '8 comprimés',
                    inventaire: '253',
                    remarques: 'Aucune'
                },
                {
                    nom: 'Doliprane 100mg',
                    type: 'Comprimés',
                    contenu: '8 comprimés',
                    inventaire: '253',
                    remarques: 'Aucune'
                },
                {
                    nom: 'Doliprane 100mg',
                    type: 'Comprimés',
                    contenu: '8 comprimés',
                    inventaire: '253',
                    remarques: 'Aucune'
                },
                {
                    nom: 'Doliprane 100mg',
                    type: 'Comprimés',
                    contenu: '8 comprimés',
                    inventaire: '253',
                    remarques: 'Aucune'
                },
                {
                    nom: 'Doliprane 100mg',
                    type: 'Comprimés',
                    contenu: '8 comprimés',
                    inventaire: '253',
                    remarques: 'Aucune'
                },
                {
                    nom: 'Doliprane 100mg',
                    type: 'Comprimés',
                    contenu: '8 comprimés',
                    inventaire: '253',
                    remarques: 'Aucune'
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
                Header: 'Nom',
                accessor: 'nom',
            },
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Volume/Poids/Nombre',
                accessor: 'contenu',
            },
            {
                Header: 'Inventaire',
                accessor: 'inventaire',
            },
            {
                Header: 'Remarques',
                accessor: 'remarques',
            },
        ]

        return (
            <div style={{backgroundColor: "pink", height: "100%", overflow: "scroll",}}>
                <ReactTable
                    data={this.state.data}
                    columns={columns}
                    showPaginationTop={true}
                    pageSize={5}
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