import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import {Auth} from "../api/auth";

class Header extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logout() {
        Auth.logout();
    }

    render() {
        return (
            <div>
                <Navbar light expand="md" className="bg-carShop text-white">
                    <img src={require('../logo.png')} width="5%" alt="logo"/>
                    <NavbarBrand>CarShop</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to="/" className="nav-link text-white">Home</Link>
                            </NavItem>
                            {!Auth.isLoggedIn() ?
                                <NavItem>
                                    <Link to="/login" className="nav-link text-white">Sign in</Link>
                                </NavItem>
                                : null}
                            {!Auth.isLoggedIn() ? (
                                <NavItem>
                                    <Link to="/register" className="nav-link text-white">Sign up</Link>
                                </NavItem>
                            ) : null}
                            {Auth.isLoggedIn() ? (
                                <NavItem>
                                    <Link to="/cars/sell" className="nav-link text-white">Sell car</Link>
                                </NavItem>
                            ) : null}
                            {Auth.isLoggedIn() ? (
                                <NavItem>
                                    <Link to="/login" onClick={this.logout} className="nav-link text-white">Sign out</Link>
                                </NavItem>
                            ) : null}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;
