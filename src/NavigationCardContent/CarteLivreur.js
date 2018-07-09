import React, { Component } from 'react'

import Map from './Map'
import { API_URL, GOOGLE_API_KEY } from '../JS/constants'

class Carte extends Component {
    constructor(props) {
        super(props)
        this.state = {
            points: [],
        }
    }

    componentDidMount() {
        fetch(`${API_URL}/deliveries/prepared`, {credentials: 'include'}).then(response => response.json())
            .then(async result => {
                const promises = []
                result.forEach(point => {
                    const address = point.etat === 'pickedup'? point.patientAddress : point.pharmacyAddress
                    promises.push(
                        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_API_KEY}`)
                            .then(response => response.json())
                            .then(result => {
                                if (result.results && result.results[0] && result.results[0].geometry) return result.results[0].geometry.location
                                else console.log('UNEXPECTED RESPONSE FROM GOOGLE')
                            })
                    )
                })

                const locations = await Promise.all(promises)
                this.setState({ points: locations })
            })
            .catch(error => {
                console.log('ERROR', error)
            })
    }

    render() {
        return (
            <Map pharmacies={this.state.points}/>
        )
    }
}

export default Carte