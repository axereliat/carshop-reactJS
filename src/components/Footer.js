import React, { Component } from 'react';
import {Navbar} from "reactstrap";

class Footer extends Component {
    render() {
        return (
            <Navbar light expand="md" style={{position: ''}} className="bg-carShop text-white">
                Copyright &copy; Mario Markov 2018
            </Navbar>
        );
    }
}

export default Footer;
