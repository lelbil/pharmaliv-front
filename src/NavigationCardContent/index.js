import React from 'react'
import OrdersList from "./OrdersList";
import IDs from '../JS/ids'

const contentMapping = {
    [IDs.HISTORIQUE_COMMANDE_PHARMACIE]:  <OrdersList style={{height: "auto", width: "auto"}}/>,
    [IDs.COMMANDES_ENCOURS_PHARMACIE]: <OrdersList  style={{height: "auto", width: "auto"}} enCours={true} />
}

export default contentMapping