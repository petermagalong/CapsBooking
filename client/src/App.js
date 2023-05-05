import 'bootstrap/dist/css/bootstrap.min.css';
import "./pages/LandingPage/styles.css";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import HomePage from "./pages/LandingPage/HomePage";
import Services from './pages/LandingPage/Services';
import { Link, Route, Router, Routes, useLocation, useRoutes } from 'react-router-dom'
import Reservation from './pages/Form/Reservation';

function App() {
  let location = useLocation()
  const router = useRoutes([
    {
      path: '/home',
      element: <HomePage />
    },
    {
      path: '/Table',
      element: <Reservation />
    }
  ]);
  console.log(location, 'location')
  return (
    <>
      <Navbar className="NavbarStyle" collapseOnSelect expand="lg" variant="dark" sticky="top">
        <Navbar.Brand><img className="navbarLogo" alt='CAPS' src='images/capslogo.png' /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className='navBarToggle' id="responsive-navbar-nav">
          <Nav >
            <Nav.Link className="navBarItem" as={Link} to="/home">HOME</Nav.Link>
            <Nav.Link className="navBarItem" as={Link} to="/home">SERVICES</Nav.Link>
            <Nav.Link className="navBarItem" as={Link} to="/home">ABOUT</Nav.Link>
            <Nav.Link className="navBarItem" as={Link} to="/home">CONTACT US</Nav.Link>
            <Nav.Link className="navBarItem" as={Link} to="/Table">LOG IN</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div>
        <Routes>
          <Route path="/Table" element={<Reservation />} />
          <Route path='/home' element={<HomePage />} />
        </Routes >
      </div>
    </>
  );
}

export default App;



