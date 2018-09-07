import React, { Component } from 'react';
import {Service} from "../api/service";
import {Auth} from "../api/auth";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
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

        Service.login(this.state.username, this.state.password)
            .then(res => {
                Auth.saveData(res.data);
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({loading: false});
                this.setState({error: 'Invalid credentials.'});
            });
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="text-center">Sigh in</h1>
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
                    <button type="submit"
                            className="btn btn-primary"
                            disabled={this.state.loading}
                    >{this.state.loading ? 'please wait...' : 'Login'}</button>
                </form>
            </div>
        );
    }
}

export default Login;
