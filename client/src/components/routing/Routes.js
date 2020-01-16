import React from 'react'
import {BrowserRouter, Switch, Route } from 'react-router-dom';

// User
import Register from '../user/Register';
import Login from '../user/Login';
import UserDashboard from '../user/UserDashboard';
import ResetPass from '../user/ResetPass';

// Shops
import ShopRegister from '../shops/ShopRegister';
import ShopLogin from '../shops/ShopLogin';
import ShopDashboard from '../shops/ShopDashboard';
import ShopResetPass from '../shops/ShopResetPass';
import Shops from '../shops/Shops';
import ShopPage from '../shops/ShopPage';
import CreateItem from '../items/CreateItem';
import MyShopItems from '../items/MyShopItems';


// Admin
import AdminDashboard from '../admin/AdminDashboard';


// Utilities
import NotFound from '../layout/NotFound';
import PrivateRoute from '../userAuth/PrivateRoute';
import ShopRoute from '../shopAuth/ShopRoute';
import AdminRoute from '../userAuth/AdminRoute';


const Routes = () => {
    return (        
        <BrowserRouter>
            <Switch>        
                <Route exact path ='/user/register' component = {Register} />
                <Route exact path ='/user/login' component = {Login} />     
                <PrivateRoute exact path ='/user/dashboard' component = {UserDashboard} />     
                <Route exact path="/user/reset/password/:token" component = {ResetPass} />
                <Route exact path="/shops" component = {Shops} />
                <PrivateRoute exact path="/shops/:id" component = {ShopPage} />

                <Route exact path ='/shop/register' component = {ShopRegister} />
                <Route exact path ='/shop/login' component = {ShopLogin} />     
                <ShopRoute exact path ='/shop/dashboard' component = {ShopDashboard} />     
                <ShopRoute exact path = '/my/shops/:id' component = {ShopPage} />     
                <ShopRoute exact path = '/create/item' component = {CreateItem} />
                <ShopRoute exact path = '/shop/:id/items' component = {MyShopItems} />
                <Route exact path="/shop/reset/password/:token" component = {ShopResetPass} />

                <AdminRoute exact path="/admin/dashboard" component = {AdminDashboard} />                

                <Route component={NotFound} />
   
            </Switch>
        </BrowserRouter>


    )
}

export default Routes;