import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { LocalPharmacy, Place, AddCircle, PlayCircleFilled, List, ShoppingCart, Map, AccountCircle, PersonAdd, History} from 'material-ui-icons/'
import Header from './Header'
import Content from './Content'
import IDs from './JS/ids'


const patientContent = [
    {
        label: "Mes Commandes",
        icon: <List/>,
        id: "mesCmd",
    },
    {
        label: "Trouver Une Pharmacie",
        icon: <Place/>,
        id: "trvPharma",
    },
    {
        label: "Nouvelle Commande",
        icon: <AddCircle/>,
        id: "nvlCmd",
    },
    {
        label: "Explorer Le Catalogue Des Médicaments",
        icon: <LocalPharmacy/>,
        id: "ctlg",
    },
]

const deliveryManContent = [
    {
        label: "Commandes Effectuées",
        icon: <List/>,
        id: "histCmd",
    },
    {
        label: "Carte",
        icon: <Map/>,
        id: "crt",
    },
    {
        label: "Livraison(s) En Cours",
        icon: <ShoppingCart/>,
        id: "liv",
    },
]

const doctorContent = [
    {
        label: "Inscrire Un Nouveau Patient",
        icon: <PersonAdd/>,
        id: "nvPtn",
    },
    {
        label: "Déjà Commandées",
        icon: <History/>,
        id: "histCmdDoc",
    },
    {
        label: "Nouvelle Commande",
        icon: <AddCircle/>,
        id: "nvlCmdDoc",
    },
    {
        label: "Mes Patients",
        icon: <AccountCircle/>,
        id: "mesPtn",
    },
]

const pharmacistContent = [
    {
        label: "Commandes En Cours",
        icon: <PlayCircleFilled/>,
        id: IDs.COMMANDES_ENCOURS_PHARMACIE,
    },
    {
        label: "Historique Des Commandes",
        icon: <History/>,
        id: IDs.HISTORIQUE_COMMANDE_PHARMACIE,
    },
    {
        label: "Mes Médicaments",
        icon: <List/>,
        id: "mesMed",
    },
    {
        label: "Ajouter Un Nouveau Médicament",
        icon: <AddCircle/>,
        id: "nvMed",
    },
]

class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
            <div className="App">
                <div id="header">
                    <Header/>
                </div>
                <div id="content">
                    <Content papers={pharmacistContent}/>
                </div>
            </div>
        </MuiThemeProvider>
    )
  }
}

export default App;
