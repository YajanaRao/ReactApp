

import React from 'react';
import Admin from './Admin';
import Welcome from './Welcome'

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
        const actype = this.props.actype;
        let content;

        if (isLoggedIn) {
            
            if(actype === "admin"){
                content = <Admin alert={this.props.notify} />
            }else{
                content = <p>Hi user</p>;
            }
            
        } else {
            content = <div><Welcome status={this.state.isLoggedIn} logout={this.handleLogoutClick} /></div>
        }

        return (
            <div className="App">
            {content}
            </div>
        );
    }
}





