import React from 'react'
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from '../user/Register';

const Routes = () => {
    return (        
        <BrowserRouter>
            <Switch>        
                <Route exact path ='/register' component = {Register} />        
            </Switch>
        </BrowserRouter>


    )
}

export default Routes;