import React from 'react'
import OrdersList from "./OrdersList"
import DrugList from './DrugsList'
import PatientsList from './PatientsList'
import IDs from '../JS/ids'
import AddDrug from "./AddDrug";

const contentMapping = {
    [IDs.HISTORIQUE_COMMANDE_PHARMACIE]:  <OrdersList style={{height: "auto", width: "auto"}}/>,
    [IDs.COMMANDES_ENCOURS_PHARMACIE]: <OrdersList  style={{height: "auto", width: "auto"}} target="pharmacie" enCours={true} />,
    [IDs.MEDICAMENTS_PHARMACIE]: <DrugList style={{height: "auto", width: "auto"}}/>,
    [IDs.AJOUTER_MEDICAMENT]: <AddDrug style={{height: "auto", width: "auto"}}/>,

    [IDs.HISTORIQUE_COMMANDE_MEDECIN]: <OrdersList  style={{height: "auto", width: "auto"}} target="medecin"/>,
    [IDs.MES_PATIENTS]: <PatientsList style={{height: "auto", width: "auto"}}/>,
}

export default contentMapping