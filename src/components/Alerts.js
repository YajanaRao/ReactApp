import React from 'react';

export default class Alerts extends React.Component {
    render() {
        if(this.props.type === "success"){
            return(
                <div className="container">
                    <div className="row">
                        <div className="col align-self-center">
                            <div className="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>{this.props.type}!</strong> {this.props.message}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                        </div>
                        </div>
                    </div>
                </div>
            )
        }else if(this.props.type === "error"){
            return (
                <div className="container">
                    <div className="row">
                        <div className="col align-self-center">
                            <div className="alert alert-danger" role="alert">
                                <strong>{this.props.type}!</strong> {this.props.message}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="container">

                </div>
            )
        }
    }
}