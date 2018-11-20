import React from 'react';

export default class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            users:[],
            name: '',
            email: "",
            password: "",
        };
        this.createUser = this.createUser.bind(this);
    }

    componentDidMount(){
        fetch("http://localhost:5000/api/users/all",
            {
                method: "GET",
                mode: "cors",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        users:[result]
                    })
                },
                
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error.toString())
                }
            )
    }

    createUser(){
        this.setState({
            show:true
        })
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
        this.props.alert("success", "Account created successfully");
        event.preventDefault();
    }



    render() {
        
        
        return (
            <div id="top">
            <div className={this.state.show ? "container d-none" : "container"}>
                    <div className="row bottom-padding">
                        <div className="col-sm-10">
                            
                        </div>
                        <div className="col-sm-2">
                            <button className="btn btn-success" onClick={this.createUser}>Add new user</button>
                        </div>
                        
                    </div>
                    <div className="row">
                        <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Account Type</th>
                                </tr>
                                
                            </thead>
                            <tbody>
                               
                                {
                                    this.state.users.map((user,i) =>
                                        <tr key={i + 1}>
                                            <th scope="row">{i+1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.type}</td>
                                    </tr>
                                       
                                    )
                                }                   
                                                       
                            </tbody>
                        </table>
                    </div>
            </div>
            
                <div className={this.state.show ? "container" : "container d-none"}>
                <h1>Add new user</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="inputName" placeholder="Name" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="inputEmail" placeholder="Email" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword" placeholder="Password" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success">Create</button>
                </form>
            </div>
        </div>
        )
    }
}

