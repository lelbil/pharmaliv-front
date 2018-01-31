import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { LocalPharmacy, Place, AddCircle, PlayCircleFilled, List, ShoppingCart, Map, AccountCircle, PersonAdd, History} from 'material-ui-icons/'
import Header from './Header'
import Content from './Content'


const patientContent = [
    {
        label: "Mes Commandes",
        icon: <List/>
    },
    {
        label: "Trouver Une Pharmacie",
        icon: <Place/>
    },
    {
        label: "Nouvelle Commande",
        icon: <AddCircle/>
    },
    {
        label: "Explorer Le Catalogue Des Médicaments",
        icon: <LocalPharmacy/>
    },
]

const deliveryManContent = [
    {
        label: "Commandes Effectuées",
        icon: <List/>
    },
    {
        label: "Carte",
        icon: <Map/>
    },
    {
        label: "Livraison(s) En Cours",
        icon: <ShoppingCart/>
    },
]

const doctorContent = [
    {
        label: "Inscrire Un Nouveau Patient",
        icon: <PersonAdd/>
    },
    {
        label: "Déjà Commandées",
        icon: <History/>
    },
    {
        label: "Nouvelle Commande",
        icon: <AddCircle/>
    },
    {
        label: "Mes Patients",
        icon: <AccountCircle/>
    },
]

const pharmacistContent = [
    {
        label: "Commandes En Cours",
        icon: <PlayCircleFilled/>
    },
    {
        label: "Historique Des Commandes",
        icon: <History/>
    },
    {
        label: "Mes Médicaments",
        icon: <List/>
    },
    {
        label: "Ajouter Un Nouveau Médicament",
        icon: <AddCircle/>
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
