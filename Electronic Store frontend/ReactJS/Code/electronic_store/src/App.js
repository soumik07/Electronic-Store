import logo from './logo.svg';
import './App.css';
import { Button,Nav,Navbar,NavDropdown,Form,Container } from 'react-bootstrap';
import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom';
import Index from './pages/Index.js';
import About from './pages/About.js';
import Cart from './pages/Cart.js';
import Services from './pages/Services.js';
import Store from './pages/Store.js';
import Profile from './pages/users/Profile.jsx';
import AboutUser from './pages/users/AboutUser.jsx';
import CustomNavbar from './components/Navbar.jsx';
import Contact from './pages/Contact.js';
import { ToastContainer, Zoom } from 'react-toastify';
import Login from './pages/login.js';
import Register from './pages/Register.js';
import Homepage from './pages/users/Home.js';
import UserProvider from './context/UserProvider.js';
import Order from './pages/users/Order.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminHome from './pages/admin/AdminHome.jsx';
import AddProduct from './pages/admin/AddProduct.jsx';
import Dashboard from './pages/users/dashboard.jsx';
import ViewProduct from './pages/admin/ViewProduct.jsx';
import AddCategory from './pages/admin/AddCategory.jsx';
import ViewCategory from './pages/admin/ViewCategory.jsx';
import AdminOrders from './pages/admin/AdminOrders.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx';
import StorePage from './pages/users/StorePage.jsx';




function App() {
  return (
    <UserProvider>
      <CustomNavbar/>
      <BrowserRouter>
      <ToastContainer
        position='top-right'
        theme='dark' draggable
        transition={Zoom}
      />
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/services' element={<Services/>}/>
          {/* <Route path='/store' element={<Store/>}/> */}
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Register/>}/>
          <Route path='/store' element={<StorePage/>}/>

          <Route path='/users' element={<Dashboard/>}>
              <Route path='home' element={<Homepage/>}/>
              <Route path="profile/:userId" element={<Profile/>}/>
              <Route path='orders' element={<Order/>}/>
              <Route path='aboutuser' element={<AboutUser/>}/>
          </Route>

          <Route path='/admin' element={<AdminDashboard/>}>
              <Route path='home' element={<AdminHome/>}/>
              <Route path='add-product' element={<AddProduct/>}/>
              <Route path='products' element={<ViewProduct/>}/>
              <Route path='add-category' element={<AddCategory/>}/>
              <Route path='categories' element={<ViewCategory/>}/>
              <Route path='orders' element={<AdminOrders/>}/>
              <Route path='users' element={<AdminUsers/>}/>
            </Route>
        </Routes>
    </BrowserRouter>
    
    </UserProvider>
    
  );
}

export default App;
