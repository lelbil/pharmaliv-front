import React from 'react'
import OrdersList from "./OrdersList"
import DrugList from './DrugsList'
import PatientsList from './PatientsList'
import AddPatient from './AddPatient'
import IDs from '../JS/ids'
import AddDrug from "./AddDrug"
import NewOrder from "./NewOrder"
import DrugsCatalog from './DrugsCatalog'
import Carte from './Carte'

const contentMapping = {
    [IDs.HISTORIQUE_COMMANDE_PHARMACIE]:  <OrdersList style={{height: "auto", width: "auto"}} target="pharmacie"/>,
    [IDs.COMMANDES_ENCOURS_PHARMACIE]: <OrdersList  style={{height: "auto", width: "auto"}} target="pharmacie" enCours={true} />,
    [IDs.MEDICAMENTS_PHARMACIE]: <DrugList style={{height: "auto", width: "auto"}}/>,
    [IDs.AJOUTER_MEDICAMENT]: <AddDrug style={{height: "auto", width: "auto"}}/>,

    [IDs.HISTORIQUE_COMMANDE_MEDECIN]: <OrdersList  style={{height: "auto", width: "auto"}} target="medecin"/>,
    [IDs.MES_PATIENTS]: <PatientsList style={{height: "auto", width: "auto"}}/>,
    [IDs.NOUVEAU_PATIENT]: <AddPatient style={{height: "auto", width: "auto"}}/>,
    [IDs.NOUVELLE_COMMANDE_MEDECIN]: <NewOrder style={{height: "auto", width: "auto"}} target="medecin"/>,

    [IDs.MES_COMMANDES_PATIENT]: <OrdersList style={{height: "auto", width: "auto"}} target="patient"/>,
    [IDs.NOUVELLE_COMMANDE_PATIENT]: <NewOrder style={{height: "auto", width: "auto"}} target="patient"/>,
    [IDs.CATALOGUE_MEDICAMENTS]: <DrugsCatalog style={{height: "auto", width: "auto"}}/>,
    [IDs.TROUVER_PHARMACIE_CARTE]: <Carte/>,

    [IDs.HISTORIQUE_COMMANDE_LIVREUR]: <OrdersList style={{height: "auto", width: "auto"}} target="livreur"/>,
    [IDs.COMMANDES_ENCOURS_LIVREUR]: <OrdersList style={{height: "auto", width: "auto"}} target="livreur" enCours={true}/>,

}

export default contentMapping