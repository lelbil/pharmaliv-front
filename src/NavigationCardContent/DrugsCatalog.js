import React, { Component } from 'react'
import {GridList, GridTile} from 'material-ui/GridList'

const tilesData = [
    {
        img: 'https://www.pharmarket.com/media/fr_FR3573577/f1200xf1200/doliprane-tabs-1000mg-8-comprimes-f1200-f1200.png',
        title: 'Doliprane',
        author: '1000mg',
    },
    {
        img: 'https://www.pharmarket.com/media/fr_FR3573577/f1200xf1200/doliprane-tabs-1000mg-8-comprimes-f1200-f1200.png',
        title: 'Doliprane',
        author: '1000mg',
    },
    {
        img: 'https://www.pharmarket.com/media/fr_FR3573577/f1200xf1200/doliprane-tabs-1000mg-8-comprimes-f1200-f1200.png',
        title: 'Doliprane',
        author: '1000mg',
    },
    {
        img: 'https://www.pharmarket.com/media/fr_FR3573577/f1200xf1200/doliprane-tabs-1000mg-8-comprimes-f1200-f1200.png',
        title: 'Doliprane',
        author: '1000mg',
    },
    {
        img: 'https://www.pharmarket.com/media/fr_FR3573577/f1200xf1200/doliprane-tabs-1000mg-8-comprimes-f1200-f1200.png',
        title: 'Doliprane',
        author: '1000mg',
    },
    {
        img: 'https://www.pharmarket.com/media/fr_FR3573577/f1200xf1200/doliprane-tabs-1000mg-8-comprimes-f1200-f1200.png',
        title: 'Doliprane',
        author: '1000mg',
    },
    {
        img: 'https://www.pharmarket.com/media/fr_FR3573577/f1200xf1200/doliprane-tabs-1000mg-8-comprimes-f1200-f1200.png',
        title: 'Doliprane',
        author: '1000mg',
    },
    {
        img: 'https://www.pharmarket.com/media/fr_FR3573577/f1200xf1200/doliprane-tabs-1000mg-8-comprimes-f1200-f1200.png',
        title: 'Doliprane',
        author: '1000mg',
    },
    {
        img: 'https://www.pharmarket.com/media/fr_FR3573577/f1200xf1200/doliprane-tabs-1000mg-8-comprimes-f1200-f1200.png',
        title: 'Doliprane',
        author: '1000mg',
    },
]

//Todo: try to have an automatic margin-top or to align-items to center
const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    },
}

class DrugsCatalog extends Component {

    render() {
        return (
            <div style={styles.root}>
                <GridList style={styles.gridList} cols={1}>
                    {tilesData.map((tile) => (
                        <GridTile
                            key={tile.img}
                            title={tile.title}
                            subtitle={<span>by <b>{tile.author}</b></span>}
                        >
                            <img src={tile.img} />
                        </GridTile>
                    ))}
                </GridList>
            </div>
        )
    }
}

export default DrugsCatalog