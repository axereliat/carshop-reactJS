import React, { Component } from 'react';
import {Service} from "../api/service";

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: null,
            loading: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({loading: true});

        Service.register(this.state.username, this.state.password, this.state.confirmPassword, this.state.email)
            .then(res => {
                this.setState({loading: false});
                if (res.data.message !== 'success') {
                    this.setState({
                        error: res.data.message
                    });
                } else {
                    this.props.history.push('/login');
                }
            })
            .catch(err => {
                this.setState({loading: false});
                console.log(err);
            });
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="text-center">Sigh up</h1>
                {this.state.error ? (
                    <div className="alert alert-danger" role="alert">
                        {this.state.error}
                    </div>
                ) : null}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username" className="control-label">Username</label>
                        <input type="text"
                               className="form-control"
                               id="username"
                               name="username"
                               placeholder="Username..."
                               onChange={this.handleChange}
                               disabled={this.state.loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="control-label">Email</label>
                        <input type="email"
                               className="form-control"
                               id="email"
                               name="email"
                               placeholder="Email..."
                               onChange={this.handleChange}
                               disabled={this.state.loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="control-label">Password</label>
                        <input type="password"
                               className="form-control"
                               id="password"
                               name="password"
                               placeholder="Password..."
                               onChange={this.handleChange}
                               disabled={this.state.loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="control-label">Confirm Password</label>
                        <input type="password"
                               className="form-control"
                               id="confirmPassword"
                               name="confirmPassword"
                               placeholder="Confirm Password..."
                               onChange={this.handleChange}
                               disabled={this.state.loading}
                        />
                    </div>
                    <button type="submit"
                            className="btn btn-primary"
                            disabled={this.state.loading}
                    >{this.state.loading ? 'please wait...' : 'Register'}</button>
                </form>
            </div>
        );
    }
}

export default Register;
