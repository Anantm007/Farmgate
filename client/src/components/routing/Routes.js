import React from 'react'
import {BrowserRouter, Switch, Route } from 'react-router-dom';

// User
import Register from '../user/Register';
import Login from '../user/Login';
import UserDashboard from '../user/UserDashboard';
import ResetPass from '../user/ResetPass';
import UserSettings from '../user/UserSettings';

// Shops
import ShopRegister from '../shops/ShopRegister';
import ShopLogin from '../shops/ShopLogin';
import ShopDashboard from '../shops/ShopDashboard';
import ShopResetPass from '../shops/ShopResetPass';
import Shops from '../shops/Shops';
import ShopPage from '../shops/ShopPage';
import CreateItem from '../items/CreateItem';
import MyShopItems from '../items/MyShopItems';
import UpdateItem from '../items/UpdateItem';

// Admin
import AdminDashboard from '../admin/AdminDashboard';
import AdminUsers from '../admin/AdminUsers';
import ShopList from '../admin/ShopList';
import AdminShop from '../admin/AdminShopItems';

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
                <PrivateRoute exact path="/user/:id/settings" component = {UserSettings} />

                <Route exact path ='/shop/register' component = {ShopRegister} />
                <Route exact path ='/shop/login' component = {ShopLogin} />     
                <ShopRoute exact path ='/shop/dashboard' component = {ShopDashboard} />     
                <ShopRoute exact path = '/my/shops/:id' component = {ShopPage} />     
                <ShopRoute exact path = '/create/item' component = {CreateItem} />
                <ShopRoute exact path = '/shop/:id/items' component = {MyShopItems} />
                <ShopRoute exact path = '/shop/:id/item/:itemid' component = {UpdateItem} />
                <Route exact path="/shop/reset/password/:token" component = {ShopResetPass} />

                <AdminRoute exact path="/admin/dashboard" component = {AdminDashboard} />                
                <AdminRoute exact path="/admin/users" component = {AdminUsers} />                        
                <AdminRoute exact path="/admin/shops" component = {ShopList} />                
                <AdminRoute exact path="/admin/shops/:id" component = {AdminShop} />            
                <AdminRoute exact path="/admin/update/item/:itemid" component = {UpdateItem} />    

                <Route component={NotFound} />
   
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;