import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';


// User
import Register from './components/user/Register';
import Login from './components/user/Login';
import UserDashboard from './components/user/UserDashboard';
import ResetPass from './components/user/ResetPass';
import UserOrders from './components/user/UserOrders';
import UserSettings from './components/user/UserSettings';
import UserCart from './components/user/UserCart';
import Checkout from './components/user/Checkout';
import CheckPayment from './components/user/CheckPayment';

// Shops
import ShopRegister from './components/shops/ShopRegister';
import ShopLogin from './components/shops/ShopLogin';
import ShopDashboard from './components/shops/ShopDashboard';
import ShopResetPass from './components/shops/ShopResetPass';
import Shops from './components/shops/Shops';
import ShopOrders from './components/shops/ShopOrders';
import ShopPage from './components/shops/ShopPage';
import CreateItem from './components/items/CreateItem';
import MyShopItems from './components/items/MyShopItems';
import UpdateItem from './components/items/UpdateItem';

// Admin
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUsers from './components/admin/AdminUsers';
import ShopList from './components/admin/ShopList';
import AdminShop from './components/admin/AdminShopItems';
import AdminOrders from './components/admin/AdminOrders';
import InvoiceListShops from './components/admin/InvoiceListShops';
import ShopSettings from './components/shops/ShopSettings';

// Utilities
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/userAuth/PrivateRoute';
import ShopRoute from './components/shopAuth/ShopRoute';
import AdminRoute from './components/userAuth/AdminRoute';

import './App.css';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const  App = () => {
  return ( 
        <Router>
          <Navbar />
          
          <Switch>

            <Route exact path='/' component={Landing} />
              
            <Route exact path ='/user/register' component = {Register} />
            <Route exact path ='/user/login' component = {Login} />     
            <PrivateRoute exact path ='/user/dashboard' component = {UserDashboard} />     
            <Route exact path="/user/reset/password/:token" component = {ResetPass} />
            <Route exact path="/shops" component = {Shops} />
            <Route exact path="/shops/:id" component = {ShopPage} />
            <PrivateRoute exact path="/user/:id/settings" component = {UserSettings} />
            <PrivateRoute exact path="/user/:id/orders" component = {UserOrders} />
            <PrivateRoute exact path="/cart" component = {UserCart} />
            <PrivateRoute exact path='/checkout' component = {Checkout} />
            <Route exact path='/checkPayment' component = {CheckPayment} />

            <Route exact path ='/shop/register' component = {ShopRegister} />
            <Route exact path ='/shop/login' component = {ShopLogin} />     
            <ShopRoute exact path ='/shop/dashboard' component = {ShopDashboard} />     
            <ShopRoute exact path = '/my/shops/:id' component = {ShopPage} /> 
            <ShopRoute exact path="/shop/:id/settings" component = {ShopSettings} />    
            <ShopRoute exact path = '/create/item' component = {CreateItem} />
            <ShopRoute exact path="/shop/:id/orders" component = {ShopOrders} />
            <ShopRoute exact path = '/shop/:id/items' component = {MyShopItems} />
            <ShopRoute exact path = '/shop/:id/item/:itemid' component = {UpdateItem} />
            <Route exact path="/shop/reset/password/:token" component = {ShopResetPass} />

            <AdminRoute exact path="/admin/dashboard" component = {AdminDashboard} />                
            <AdminRoute exact path="/admin/users" component = {AdminUsers} />                        
            <AdminRoute exact path="/admin/shops" component = {ShopList} />                
            <AdminRoute exact path="/admin/shops/:id" component = {AdminShop} />            
            <AdminRoute exact path="/admin/update/item/:itemid" component = {UpdateItem} />    
            <AdminRoute exact path="/admin/orders" component = {AdminOrders} />
            <AdminRoute exact path='/admin/invoice' component = {InvoiceListShops} />
            
            <Route component={NotFound} />
    
          </Switch>
          
        </Router>
  );
};

export default App;
