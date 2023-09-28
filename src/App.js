import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/utils/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/admin/Dashboard';
import UserDashboard from './pages/user/Dahoboard'
import Product from './pages/admin/Product';
import Category from './pages/admin/Category';
import Order from './pages/admin/orderSection/Orders';
import Admin from './pages/admin/Admin';
import Setting from './pages/admin/Setting';
import AllProduct from './pages/AllProduct';
import ProductPage from './pages/ProductPage';
import AppState from './context/appState';
import Cart from './pages/cart/Cart';
import CheckoutSuccess from './components/checkout/CheckoutSuccess';
import { ToastContainer } from 'react-toastify';
import OrderDetails from './pages/admin/orderSection/OrderDetails';


function App () {

  return (
    <AppState>
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/auth/signup' element={<Signup />} />
          <Route exact path='/auth/login' element={<Login />} />
          <Route exact path='/product/:id' element={<ProductPage />} />
          <Route exact path='/products' element={<AllProduct />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/order/success' element={<CheckoutSuccess />} />

          <Route exact path='/account/admin/Dashboard' element={<Dashboard />} />
          <Route exact path='/account/user/Dashboard' element={<UserDashboard />} />
          <Route exact path='/account/admin/product' element={<Product />} />
          <Route exact path='/account/admin/category' element={<Category />} />
          <Route exact path='/account/admin/orders' element={<Order />} />
          <Route exact path='/account/user/orders' element={<Order />} />
          <Route exact path='/account/admin/order/details/:id' element={<OrderDetails />} />
          <Route exact path='/account/admin/admins' element={<Admin />} />
          <Route exact path='/account/admin/setting' element={<Setting />} />
        </Routes>
      </Router>
    </AppState>
  );
}

export default App;
