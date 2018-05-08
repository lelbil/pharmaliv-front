import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginView from './LoginView'
import RegisterView from './RegisterView'
import App from './App'

import { API_URL } from './JS/constants'

let type = false

class Switcher extends Component {

    componentDidMount() {
        fetch(`${API_URL}/type`, {credentials: 'include'}).then(response => response.json())
            .then(data => {
                console.log('TYPE', data.type)
                type = data.type
                this.forceUpdate()
            })
            .catch(error => {
                console.log('ERROR', error)
            })
    }

    render() {
        const AppComponent = props => {
            return (
                <App
                    type={type}
                    {...props}
                />
            );
        }

        console.log('In render', type)

        return (
            <Switch>
                <Route path="/login" component={LoginView} />
                <Route path="/app" component={App} />
                <Route path="/register" component={RegisterView} />
                <Route exactPath="/" component={!!type ? AppComponent : LoginView}/>
            </Switch>
        )
    }
}

export default Switcher