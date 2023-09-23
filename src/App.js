import './App.css';
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/utils/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/admin/Dashboard';
import Product from './pages/admin/Product';
import Category from './pages/admin/Category';
import Order from './pages/admin/Orders';
import Admin from './pages/admin/Admin';
import Setting from './pages/admin/Setting';
import AllProduct from './pages/AllProduct';
import ProductPage from './pages/ProductPage';
import Utils from './utils/helper';
import AppState from './context/appState';
import Cart from './pages/cart/Cart';
import CheckoutSuccess from './components/checkout/CheckoutSuccess';

function App () {

  return (
    <AppState>

      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/login' element={<Login />} />
          <Route exact path='/product/:id' element={<ProductPage />} />
          <Route path='/products' element={<AllProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order/success' element={<CheckoutSuccess />} />

          <Route path='/account/admin/dashboard' element={<Dashboard />} />
          <Route path='/account/admin/product' element={<Product />} />
          <Route path='/account/admin/category' element={<Category />} />
          <Route path='/account/admin/orders' element={<Order />} />
          <Route path='/account/admin/admins' element={<Admin />} />
          <Route path='/account/admin/setting' element={<Setting />} />
        </Routes>
      </Router>
    </AppState>
  );
}

export default App;
