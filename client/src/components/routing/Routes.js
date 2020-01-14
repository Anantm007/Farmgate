import React from 'react'
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from '../user/Register';
import Login from '../user/Login';
import ResetPass from '../user/ResetPass';
import Shops from '../shops/Shops';
import NotFound from '../layout/NotFound';
import ShopPage from '../shops/ShopPage';
import PrivateRoute from '../userAuth/PrivateRoute';
import AdminRoute from '../userAuth/AdminRoute';

const Routes = () => {
    return (        
        <BrowserRouter>
            <Switch>        
                <Route exact path ='/user/register' component = {Register} />
                <Route exact path ='/user/login' component = {Login} />     
                <Route exact path="/shops" component = {Shops} />
                <Route exact path="/user/reset/password/:token" component = {ResetPass} />
                <PrivateRoute exact path="/shops/:id" component = {ShopPage} />
                <Route component={NotFound} />
   
            </Switch>
        </BrowserRouter>


    )
}

export default Routes;