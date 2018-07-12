import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import {API_URL, tableBGColour} from '../JS/constants'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

class NewOrderDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientId: null,
            pharmacieId: null,
            type: 'domicile',
            patients: [],
            pharmacies: [],
            ordonnanceURL: null,
        }
    }

    componentDidMount = async () => {
        try {
            const [patients, pharmacies] = await Promise.all([
                fetch(`${API_URL}/mesPatients`, {credentials: 'include'}),
                fetch(`${API_URL}/pharmacies`, {credentials: 'include'})])

            this.setState({
                pharmacies: await pharmacies.json(),
                patients: await patients.json(),
            })
        } catch (error) {
            console.log('ERROR', error)
        }
    }

    handleChange = (event, index, patientId) => this.setState({patientId});

    handleChangePharmacie = (event, index, pharmacieId) => this.setState({pharmacieId})

    handleOrdonnance = e => {
        const file = e.target.files[0]

        this.uploadToS3(file).then(ordonnanceURL => {
            this.setState({
                ordonnanceURL
            })
        })
    }

    getSignedRequest = file => {
        return fetch(`${API_URL}/sign-s3?fileName=${file.name}&fileType=${file.type}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`)
                }
                return response.json()
            })
    }

    uploadFile = (file, signedRequest, url) => {
        const options = {
            method: 'PUT',
            body: file,
        }
        return fetch(signedRequest, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                return url
            })
    }

    uploadToS3 = file => {
        return this.getSignedRequest(file)
            .then(json => this.uploadFile(file, json.signedRequest, json.url))
            .then(url => {
                return url
            })
            .catch(err => {
                console.error(err)
                return null
            })
    }

    order = () => {
        const requestBodyObject = {...this.state}
        delete requestBodyObject.patients
        delete requestBodyObject.pharmacies

        const body = JSON.stringify(requestBodyObject)

        fetch(`${API_URL}/doctorOrder`, {
            method: 'POST',
            credentials: 'include',
            body,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        patientId: null,
                        pharmacieId: null,
                        type: 'domicile',
                        ordonnanceURL: null,
                    })
                }
                else {
                    console.log('GOT UNEXPECTED RESPONSE STATUS CODE WHEN TRYING TO ORDER (doctorOrder)')
                }
            })
            .catch(error => {
                console.log("ERROR", error)
            })

    }

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", flexWrap: "wrap", alignItems: "center", backgroundColor: tableBGColour}}>
                <SelectField
                    floatingLabelText="Nom du patient"
                    floatingLabelStyle={{ color: 'white', textAlign: 'left'}}
                    value={this.state.patientId}
                    onChange={this.handleChange}
                    autoWidth={true}
                    style={{ textAlign: 'left' }}
                >
                    {this.state.patients && this.state.patients.map(patient => <MenuItem value={patient.id} primaryText={patient.prenom + ' ' + patient.nom}/>)}
                </SelectField>
                <SelectField
                    floatingLabelText="Nom de la pharmacie"
                    floatingLabelStyle={{ color: 'white', textAlign: 'left'}}
                    value={this.state.pharmacieId}
                    onChange={this.handleChangePharmacie}
                    autoWidth={true}
                    style={{ textAlign: 'left' }}
                >
                    {this.state.pharmacies && this.state.pharmacies.map(pharmacie => <MenuItem value={pharmacie.id} primaryText={ pharmacie.denomination }/>)}
                </SelectField>
                <h5>Ordonnance: <input onChange={this.handleOrdonnance} type="file" id="profilepic"/></h5>
                <div style={{ display: 'flex' }}>
                    <Checkbox checked={this.state.type === 'domicile'} onCheck={() => {this.setState({ type: 'domicile' })}} label="Livré à domicile" labelStyle={{ color: 'white' }}/>
                    <Checkbox checked={this.state.type === 'pharmacie'} onCheck={() => {this.setState({ type: 'pharmacie' })}} label="Livré en pharmacie" labelStyle={{ color: 'white' }}/>
                </div>

                <RaisedButton onClick={this.order} label="Commander" primary={true}/>
            </div>
        )
    }
}

export default NewOrderDoctor