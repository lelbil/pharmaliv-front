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
        id: IDs.TROUVER_PHARMACIE_CARTE,
    },
    {
        label: "Explorer Le Catalogue Des Médicaments",
        icon: <LocalPharmacy/>,
        id: IDs.CATALOGUE_MEDICAMENTS,
    },
]

const deliveryManContent = [
    {
        label: "Commandes Effectuées",
        icon: <List/>,
        id: IDs.HISTORIQUE_COMMANDE_LIVREUR,
    },
    {
        label: "Carte",
        icon: <Map/>,
        id: IDs.CARTE_LIVREUR,
    },
    {
        label: "Livraison(s) En Cours",
        icon: <ShoppingCart/>,
        id: IDs.COMMANDES_ENCOURS_LIVREUR,
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

const contentMapping = {
    ["patientContent"]: patientContent,
    ["deliveryManContent"]: deliveryManContent,
    ["doctorContent"]: doctorContent,
    ["pharmacistContent"]: pharmacistContent
}

class App extends Component {
  render() {
      //TODO: if no user type, redirect to /
    return (
        <MuiThemeProvider>
            <div className="App">
                <div id="header">
                    <Header sessionInfo={this.props.sessionInfo}/>
                </div>
                <div id="content">
                    <Content papers={contentMapping[this.props.type]}/>
                </div>
            </div>
        </MuiThemeProvider>
    )
  }
}

export default App;
