import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginView from './LoginView'
import RegisterView from './RegisterView'
import App from './App'

import { API_URL } from './JS/constants'

export default class Switcher extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLogged: false,
            sessionInfo: null
        }
    }
    componentDidMount() {
        fetch(`${API_URL}/session`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                this.setState({
                    type: data.type,
                    sessionInfo: data
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    render() {
        const { type, sessionInfo } = this.state

        const AppComponent = props => (
            <App
                type={type}
                sessionInfo={sessionInfo}
                {...props}
            />
        )

        return (
            <Switch>
                <Route path="/login" component={LoginView} />
                <Route path="/app" render={App} />
                <Route path="/register" component={RegisterView} />
                <Route exactPath="/" component={!!type ? AppComponent : LoginView}/>
            </Switch>
        )
    }
}