import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginControl from './components/LoginControl';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Alerts from './components/Alerts';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "",
      message: ""
    };
  }

  updateStatus = (status,message) => {
    console.log("worked")
    this.setState({
      type:status,
      message: message
    })
  }
  render() {
    return (
      
        <Router>
          <div>
            <NavBar />
            <Alerts type={this.state.type} message={this.state.message}/>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={() => <Login status={this.updateStatus} />} />
            <Route path="/register" component={() =><Register status={this.updateStatus} />} />
          </div>
        </Router>
    );
  }
}



function Home(){
  return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Visit <code>src/App.js</code> and save to reload.
            </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
            </a>
        <LoginControl />
      </header>
    </div>
  )
}

export default App;
