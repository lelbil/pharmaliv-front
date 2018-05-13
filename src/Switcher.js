import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginView from './LoginView'
import RegisterView from './RegisterView'
import App from './App'

import { API_URL } from './JS/constants'

let type = false

class Switcher extends Component {

    componentDidMount() {
        fetch(`${API_URL}/session`, {credentials: 'include'}).then(response => response.json())
            .then(data => {
                type = data.type
                this.sessionInfo = data

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
                    sessionInfo={this.sessionInfo}
                    {...props}
                />
            );
        }

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