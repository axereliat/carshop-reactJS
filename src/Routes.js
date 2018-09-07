import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Register from "./components/Register";
import Login from "./components/Login";
import CarCreate from "./components/CarCreate";
import axios from 'axios';
import {Auth} from "./api/auth";
import {PrivateRoute} from "./components/PrivateRoute";
import Details from "./components/Details";
import CarEdit from "./components/CarEdit";
import CarDelete from "./components/CarDelete";

const Routes = () => {
    if (Auth.getToken()) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + Auth.getToken();
    }
    return <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
        <Route path='/cars/details/:id' component={Details}/>
        <PrivateRoute path='/cars/sell' component={CarCreate}/>
        <PrivateRoute path='/cars/edit/:id' component={CarEdit}/>
        <PrivateRoute path='/cars/delete/:id' component={CarDelete}/>
        <Route component={NotFound}/>
    </Switch>
};

export default Routes
