import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './pages/Login';
import Alerts from './components/Alerts';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      message: "",
      isLoggedIn: false,
      atype: ""
    };
  }

  getInitialState(){
    let data = JSON.parse(localStorage.getItem('react'))
    if(data){
      this.setState({
        isLoggedIn: data['login'],
        email: data['email'],
        atype: data['actype']
      })
    }
  }

  componentDidMount() {
    this.getInitialState();
  }

  updateLoginStatus = (status,message,email="",ac="user") => {
    console.log("updating status "+status)
    if(status === "success" && email  !== ""){
      this.setState({
        type: status,
        message: message,
        isLoggedIn: true,
        email:email,
        atype:ac

      })
      localStorage.setItem("react", JSON.stringify({"login": true,"email":email,"actype":ac}))
    }else if(status==="error"){
      this.setState({
        type: status,
        message: message,
        isLoggedIn: false

      })
      
    }
  }

  notify = (status,message) => {
    if (status === "success") {
      this.setState({
        type: status,
        message: message
      })
    } else if (status === "error") {
      this.setState({
        type: status,
        message: message,
      })

    }
  }

  render() {
    return (
        <Router>
          <div>
            <NavBar status={this.state.isLoggedIn} />
            <Alerts type={this.state.type} message={this.state.message}/>
            <Route exact path="/" component={() =><Home login={this.state.isLoggedIn} actype={this.state.atype} notify={this.notify} />}/>
            <Route path="/login" component={() => <Login status={this.state.isLoggedIn} update={this.updateLoginStatus}  />} />
          </div>
        </Router>
    );
  }
}



export default App;
