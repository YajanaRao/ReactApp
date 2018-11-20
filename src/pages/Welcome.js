import React from 'react';
import logo from '../logo.svg';
import { Link } from "react-router-dom";

export default class Welcome extends React.Component{



    render(){
        let button
        if(this.props.status){
           
            button = <LogoutButton onClick={this.props.logout} />;
        }else{
            button = <LoginButton />;
        }
        
        return(
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
                    {button}
            </header>
        )
    }
}


function LoginButton() {
    return (
        <button className="btn btn-outline-primary btn-lg" >
            <Link to="/login">Sign Up</Link>
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button className="btn btn-outline-primary btn-lg" onClick={props.onClick}>
            Logout
    </button>
    );
}