import React from 'react';
export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: "",
            password: "",
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handleNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    handlePasswordChange = (passwrd) => {
        this.setState({
            password: passwrd
        });
    }


    handleSubmit = event => {
        this.props.status("success","Account created successfully")
        event.preventDefault();
    }

    render() {
        return (
            <div id="login" className="form-row">
                <div className="container card col-md-6">
                    <h1 className="text-center">Sign Up</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputName">Username</label>
                            <input type="name" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Enter name"
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />
                            <small id="nameHelp" className="form-text text-muted"> A name to identify you with.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            <small id="emailHelp" className="form-text text-muted"> We will never share your email with anyone else.</small>
                        </div>
                        <Password onChage={this.handlePasswordChange} />
                        <div className="form-group form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div>
                        <button type="submit" className="btn btn-primary"
                            disabled={!this.validateForm()}
                        >Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

class Password extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            error: "",
            match: true
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
        if(this.state.password === event.target.value){
            this.setState({
                match:true
            })
        }else{
            this.setState({
                match: false
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
                    { !this.state.match ? <p className="text-danger"> Password does not match</p> : <p className="text-success">Password is matching</p>}
                    </small>
                </div>
            </div>
        )
    }
}