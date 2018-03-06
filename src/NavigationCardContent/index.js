import React from 'react'
import OrdersList from "./OrdersList"
import DrugList from './DrugsList'
import IDs from '../JS/ids'
import AddDrug from "./AddDrug";

const contentMapping = {
    [IDs.HISTORIQUE_COMMANDE_PHARMACIE]:  <OrdersList style={{height: "auto", width: "auto"}}/>,
    [IDs.COMMANDES_ENCOURS_PHARMACIE]: <OrdersList  style={{height: "auto", width: "auto"}} enCours={true} />,
    [IDs.MEDICAMENTS_PHARMACIE]: <DrugList style={{height: "auto", width: "auto"}}/>,
    [IDs.AJOUTER_MEDICAMENT]: <AddDrug style={{height: "auto", width: "auto"}}/>,
}

export default contentMapping