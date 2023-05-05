import 'bootstrap/dist/css/bootstrap.min.css';
import "./pages/LandingPage/styles.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import HomePage from "./pages/LandingPage/HomePage";
import { Link, Route, Router, Routes, useLocation } from 'react-router-dom'
import Reservation from './pages/Form/Reservation';
import LogIn from './pages/LandingPage/LogIn';
import { Container } from 'react-bootstrap';

function App() {
  let location = useLocation()
  const mainPage = location.pathname.includes('/LogIn')

  console.log(mainPage, 'location')
  return (
    <>
      {/* {mainPage ? <Container /> : */}
      <Navbar className="NavbarStyle" collapseOnSelect expand="lg" variant="dark" sticky="top">
        <Navbar.Brand><img className="navbarLogo" alt='CAPS' src='images/capslogo.png' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className='navBarToggle' id="responsive-navbar-nav">
          <Nav >
            <Nav.Link className="navBarItem" as={Link} to="/home">HOME</Nav.Link>
            <Nav.Link className="navBarItem" as={Link} to="/home">SERVICES</Nav.Link>
            <Nav.Link className="navBarItem" as={Link} to="/home">ABOUT</Nav.Link>
            <Nav.Link className="navBarItem" as={Link} to="/home">CONTACT US</Nav.Link>
            <Nav.Link className="navBarItem" as={Link} to="/LogIn">LOG IN</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* } */}

      <div>
        <Routes>
          <Route path="/LogIn" element={<LogIn />} />
          <Route path='/home' element={<HomePage />} />
        </Routes >
      </div>
    </>
  );
}

export default App;



