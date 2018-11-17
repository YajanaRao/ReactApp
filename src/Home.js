

import React from 'react';
import logo from './logo.svg';
import { Link } from "react-router-dom";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = { isLoggedIn: this.props.login };
    }


    handleLogoutClick() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;

        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
        } else {
            button = <LoginButton />;
        }

        return (
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
                    <div>
                        <Greeting isLoggedIn={isLoggedIn} />
                        {button}
                    </div>
                </header>
            </div>
        );
    }
}

function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sign up.</h1>;
}

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

function LoginButton(props) {
    return (
        <button className="btn btn-outline-primary btn-lg" >
            <Link to="/login">Login</Link>
    </button>
    );
}

function LogoutButton(props) {
    return (
        <button className="btn btn-outline-primary btn-lg"  onClick={props.onClick}>
            Logout
    </button>
    );
}


