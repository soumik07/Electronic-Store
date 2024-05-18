import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import { isLoggedIn } from '../auth/HelperAuth';
import { NavLink } from "react-router-dom";

function CustomNavbar(){

    let usercontext = useContext(UserContext)
    //const redirect = useNavigate()
    function doLogout(){
      // usercontext.setIsLogin(false)
      // usercontext.setUserData(null)
      usercontext.logout()
      // console.log(isLoggedIn())
      // redirect("/login")
    }

    return(
        <Navbar collapseOnSelect expand="lg" bg='dark' variant='dark' className='sticky-top'>
      <Container>
        <Navbar.Brand href="/">
            {/**
             *********ADDING BRAND LOGO
             * <img src="/assests/brand_logo.jpg" alt="logo" width="24" height="24" /> */}
                Electronic Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/services">Features</Nav.Link>
            
            <NavDropdown title="Categories" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Branded Phones</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Smart TVs
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Laptops</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                More
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact Us</Nav.Link>
          </Nav>
          <Nav>
            {/* {JSON.stringify(usercontext.islogin+' ')} */}
            {/* console.log(usercontext.isLogin) */}
            {/* <Nav.Link href="/cart">{JSON.stringify(usercontext.isLogin)}</Nav.Link> */}
            <Nav.Link href='/store'>Store</Nav.Link>
            <Nav.Link href="/cart">Cart(4)</Nav.Link>

            
                {/* <Nav.Link hidden={!usercontext.isLogin} href="/login">My Profile</Nav.Link>
                <Nav.Link  hidden={!usercontext.isLogin} eventKey={2} href="/signup">
                 Logout
                </Nav.Link>

                <Nav.Link hidden={usercontext.isLogin} href="/login">login</Nav.Link>
                <Nav.Link  hidden={usercontext.isLogin} eventKey={2} href="/signup">
                 signup
                </Nav.Link>
               */}


             {(usercontext.isLogin)?(
              <>
                {usercontext.isAdminUser && (
                  <Nav.Link href="/admin/home">Admin Dashboard</Nav.Link>
                )}
                <Nav.Link href={`/users/profile/${usercontext.userData.user.userId}`}>My Profile</Nav.Link>
                <Nav.Link href="/users/orders">Orders</Nav.Link>

                        {/* REMOVE THE href TAG IF REQUIRED */}
                <Nav.Link eventKey={2} onClick={doLogout} href='/login'>    
                 Logout
                </Nav.Link>
              </>
             ):(
              <>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link eventKey={2} href="/signup">
                 Sign up
                </Nav.Link>
              </>
             )}
            


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    );
}

export default CustomNavbar;