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
        id: IDs.MES_COMMANDES_PATIENT,
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
        id: IDs.NOUVEAU_PATIENT,
    },
    {
        label: "Déjà Commandées",
        icon: <History/>,
        id: IDs.HISTORIQUE_COMMANDE_MEDECIN,
    },
    {
        label: "Nouvelle Commande",
        icon: <AddCircle/>,
        id: IDs.NOUVELLE_COMMANDE_MEDECIN,
    },
    {
        label: "Mes Patients",
        icon: <AccountCircle/>,
        id: IDs.MES_PATIENTS,
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
        id: IDs.MEDICAMENTS_PHARMACIE,
    },
    {
        label: "Ajouter Un Nouveau Médicament",
        icon: <AddCircle/>,
        id: IDs.AJOUTER_MEDICAMENT,
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
                    <Content papers={patientContent}/>
                </div>
            </div>
        </MuiThemeProvider>
    )
  }
}

export default App;
