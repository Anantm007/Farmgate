import React from 'react'
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from '../user/Register';
import Login from '../user/Login';
import NotFound from '../layout/NotFound';

const Routes = () => {
    return (        
        <BrowserRouter>
            <Switch>        
                <Route exact path ='/user/register' component = {Register} />
                <Route exact path ='/user/login' component = {Login} />     
                <Route component={NotFound} />
   
            </Switch>
        </BrowserRouter>


    )
}

export default Routes;