import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './components/Home/index.jsx';
import Layout from './HOC/Layout.jsx';
import Auth from './HOC/Auth.jsx';
import RegisterLogin from './components/Register_login/index.jsx';
import Register from './components/Register_login/Register.jsx';
import UserDashboard from './components/user/index.jsx';
import Shop from './components/Shop/index.jsx';
import AddProduct from './components/user/Admin/add_product'
import ManageCategories from './components/user/Admin/manage_categories.jsx';
import UserCart from './components/user/Cart.jsx';

import ProductPage from './components/Product/index.jsx';



const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path='/' component={Auth(Home, null)} />
        <Route path='/shop' component={Auth(Shop, null)} />

        <Route path='/register_login' component={Auth(RegisterLogin, false)} />
        <Route path='/register' component={Auth(Register, false)} />
        <Route path='/product_detail/:id' component={Auth(ProductPage, null)} />

        <Route path = '/user/dashboard' component = {Auth(UserDashboard, true)}/>
        <Route path = '/user/cart' component = {Auth(UserCart, true)}/>

        <Route path = '/admin/add_product' component = {Auth(AddProduct, true)}/>
        <Route path = '/admin/manage_categories' component = {Auth(ManageCategories, true)}/>
        
        
      </Switch>
    </Layout>
  )
}



export default Routes;
