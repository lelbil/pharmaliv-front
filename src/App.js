import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header'

const styles = {
    app: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "grey",
    },
    header: {
        backgroundColor: "green",
        height: "25vh",
        border: "solid 1px grey",
        margin: "4px",
        borderRadius: "15px",
        display: "flex",
        //alignItems: "center",
        justifyContent: "center",
    },
    content: {
        height: "75vh",
        backgroundColor: "crimson",
    },
}

class App extends Component {
  render() {
    return (
        <MuiThemeProvider>
            <div className="App" style={styles.app}>
                <div id="header" style={styles.header}>
                    <Header/>
                </div>
                <div id="content" style={styles.content}>
                    CONTENT
                </div>
            </div>
        </MuiThemeProvider>
    )
  }
}

export default App;
