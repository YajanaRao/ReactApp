import React, { Component } from 'react';
import './App.css';
import Home from './Home';
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
      message: "",
      isLoggedIn: false
    };
  }

  updateStatus = (status,message) => {
    console.log(status)
    if(status === "success"){
      this.setState({
        type: status,
        message: message,
        isLoggedIn: true

      })
    }else if(status==="error"){
      this.setState({
        type: status,
        message: message,
        isLoggedIn: false

      })
    }
  }
  render() {
    return (
        <Router>
          <div>
            <NavBar />
            <Alerts type={this.state.type} message={this.state.message}/>
            <Route exact path="/" component={() =><Home login={this.state.isLoggedIn} />}/>
            <Route path="/login" component={() => <Login status={this.updateStatus} />} />
            <Route path="/register" component={() =><Register status={this.updateStatus} />} />
          </div>
        </Router>
    );
  }
}



export default App;
