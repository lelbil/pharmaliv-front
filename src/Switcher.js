import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginView from './LoginView'
import App from './App'

class Switcher extends Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={LoginView} />
                <Route path="/app" component={App} />
            </Switch>
        )
    }
}

export default Switcher