import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import LoginView from './LoginView'
import RegisterView from './RegisterView'
import App from './App'

class Switcher extends Component {

    componentWillMount() {
        //TODO: call API to receive user type if logged in
        this.setState({
            loggedIn: false
        })
    }

    render() {
        return (
            <Switch>
                <Route path="/login" component={LoginView} />
                <Route path="/app" component={App} />
                <Route path="/register" component={RegisterView} />
                <Route exactPath="/" component={this.state.loggedIn? App : LoginView}/>
            </Switch>
        )
    }
}

export default Switcher