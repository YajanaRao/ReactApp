import React from 'react';
import {  Redirect  } from "react-router-dom";


export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            isDefault: false,
            actype: "user"
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeSubmit = this.handleChangeSubmit.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handlePasswordChange = (event) =>{
        this.setState({
            password: event.target.value
        });
    }

    handleConfirmChange = (password) =>{
        this.setState({
            password: password
        })
    } 

    handleSubmit = (event) => {
        fetch("http://localhost:5000/api/login",
            {
                method: "POST",
                mode:"cors",
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log("api execution result " + result.status)

                    console.log("default account " + result.default)
                    if (result.default) {
                        this.setState({
                            isDefault: true,
                            actype: result.type
                        })
                    }else{
                        console.log(result.type);
                        this.props.update(result.status, result.message, this.state.email, result.type);
                    }
                    
                   
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.props.update("error",error.toString())
                }
            )
            console.log(this.state.isDefault +" result "+this.props.status)

        event.preventDefault();
    }

    handleChangeSubmit = (event) =>{
        fetch("http://localhost:5000/api/update",
            {
                method: "POST",
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.props.update("success", "Updated password", this.state.email, this.state.actype);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.props.update("error", error.toString())
                }
            )
        
        event.preventDefault();

    }

    skipChange = (event) =>{
        this.props.update("success", "Skipped password change", this.state.email, this.state.actype);      
        console.log("redirect " + this.state.redirect);
        event.preventDefault();
    }
    
    render(){
        if(this.props.status){
            return <Redirect to='/' />
        }else{
            return (
                <div id="login" className="form-row">
                    <div className={this.state.isDefault ? "container card col-md-6 d-none" : "container card col-md-6"}>
                        <h1 className="text-center">Log In</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                                <small id="emailHelp" className="form-text text-muted"> We will never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="InputPassword">Password</label>
                                <input type="password" className="form-control" id="InputPassword" placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handlePasswordChange}
                                />
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                            </div>
                            <button type="submit" className="btn btn-primary"
                                disabled={!this.validateForm()}
                            >Submit</button>
                        </form>
                    </div>
                    <div className={this.state.isDefault ? "container card col-md-6" : "container card col-md-6 d-none"} >
                        <h1 className="text-center">Change Password</h1>
                        <form onSubmit={this.handleChangeSubmit}>
                            <Password onChage={this.handleConfirmChange} />
                            <button type="submit" className="btn" onClick={this.skipChange}>
                               Skip
                            </button>
                            <button type="submit" className="btn btn-primary"
                                disabled={!this.validateForm()}
                            >Submit</button>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

class Password extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            error: "Enter a password",
            match: "Enter a password"
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        var password = event.target.value;
        if (event.target.value.length < 8) {
            this.setState({
                password: event.target.value,
                error: 'weak password'
            })
        } else {
            this.setState({
                password: event.target.value,
                error: ''
            })
        }
        this.props.onChage(password);
    }

    handleConfirmChange = event => {
        if (this.state.password === event.target.value) {
            this.setState({
                match: ''
            })
        } else {
            this.setState({
                match: "Password does not match"
            })
        }
    }


    handleSubmit = event => {
        event.preventDefault();
    }
    render() {
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted ">{this.state.error ? <p className="text-danger"> {this.state.error}</p> : <p className="text-success">Strong Password</p>}</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword2">Confirm Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Password"
                        onChange={this.handleConfirmChange}
                    />
                    <small id="emailHelp" className="form-text text-muted ">
                        {this.state.match ? <p className="text-danger">{this.state.match} </p> : <p className="text-success">Password is matching</p>}
                    </small>
                </div>
            </div>
        )
    }
}