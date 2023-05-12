import "bootstrap/dist/css/bootstrap.min.css";
import "./pages/LandingPage/styles.css";
import HomePage from "./pages/LandingPage/HomePage";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import LogIn from "./pages/LandingPage/LogIn";
import SignUp from "./pages/LandingPage/SignUp";
import PrivateRoute from "./routes/PrivateRoute";
import { useEffect, useState } from "react";
import Patient from "./pages/LandingPage/Form/User";
import Nurse from "./pages/User/Nurse";
import Admin from "./pages/User/Admin";
import Clerk from "./pages/User/Clerk";
import IndexNurse from "./pages/Nurse/IndexNurse";
import { Nav, Navbar } from "react-bootstrap";
import PatientProfilePage from "./pages/Patient/PatientProfilePage";
import PatientReservationPage from "./pages/Patient/PatientReservationPage";
import PatientTransacPage from "./pages/Patient/PatientTransacPage";
import NurseHomePage from "./pages/Nurse/NurseHomePage";
import NurseSchedulePage from "./pages/Nurse/NurseSchedulePage";
import NurseBoardPage from "./pages/Nurse/NurseBoardPage";
import AdminIndex from "./pages/Admin/AdminIndex";
import AdminHomePage from "./pages/Admin/AdminHomePage";
import AdminManagementPage from "./pages/Admin/AdminManagementPage";
import AdminSchedulePage from "./pages/Admin/AdminSchedulePage";
import ClerkIndex from "./pages/Clerk/ClerkIndex";
import ClerkInventory from "./pages/Clerk/ClerkInventory";
import ClerkSupply from "./pages/Clerk/ClerkSupply";
function App() {
  let location = useLocation()
  const userPage = location.pathname.includes('/user')
  const nursePage = location.pathname.includes('/nurse')
  const adminPage = location.pathname.includes('/admin')
  const clerkPage = location.pathname.includes('/clerk')
  const [isLogged, setIsLogged] = useState(false);
  const [role, setRole] = useState("");
  const isLoggedin = () => {
    const userId = localStorage.getItem("userId");
    setRole(role);
    setIsLogged(userId ? true : false);
  };
  useEffect(() => {
    isLoggedin();
  }, []);
  console.log(userPage)

  return (
    <>
      {userPage || nursePage || adminPage || clerkPage ? "" :
        <Navbar className="NavbarStyle" collapseOnSelect expand="lg" variant="dark" sticky="top">
          <Navbar.Brand><img className="navbarLogo" alt='CAPS' src='images/capslogo.png' /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className='navBarToggle' id="responsive-navbar-nav">
            <Nav >
              <Nav.Link className="navBarItem" as={Link} to="/">HOME</Nav.Link>
              <Nav.Link className="navBarItem" as={Link} to="/">SERVICES</Nav.Link>
              <Nav.Link className="navBarItem" as={Link} to="/">ABOUT</Nav.Link>
              <Nav.Link className="navBarItem" as={Link} to="/">CONTACT US</Nav.Link>
              <Nav.Link className="navBarItem" as={Link} to="/login">LOG IN</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      }
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
        {/* USER */}
        <Route path="/user"
          element={<PatientProfilePage />}
        />
        <Route path="/user/profile"
          element={<PatientProfilePage />}
        />
        <Route path="/user/reservation"
          element={<PatientReservationPage />}
        />
        <Route path="/user/transaction-history"
          element={<PatientTransacPage />}
        />

        {/* NURSE*/}
        <Route path="/nurse"
          element={<NurseHomePage />}
        />
        <Route path="/nurse/home"
          element={<NurseHomePage />}
        />
        <Route path="/nurse/schedule"
          element={<NurseSchedulePage />}
        />
        <Route path="/nurse/doctors-on-board"
          element={<NurseBoardPage />}
        />
        {/* ADMIN */}
        <Route path="/admin"
          element={<AdminHomePage />}
        />
        <Route path="/admin/home"
          element={<AdminHomePage />}
        />
        <Route path="/admin/user-management"
          element={<AdminManagementPage />}
        />
        <Route path="//admin/schedules"
          element={<AdminSchedulePage />}
        />
        {/* CLERK */}
        <Route path="/clerk"
          element={<ClerkInventory />}
        />
        <Route path="/clerk/inventory-items"
          element={<ClerkInventory />}
        />
        <Route path="/clerk/supply"
          element={<ClerkSupply />}
        />

        {/* PROTECTED ROUTES (FOR IMPLEMENTATION) */}
        <Route
          path="/user/*"
          // element={<Patient />}
          element={<PrivateRoute role="patient" element={<Patient />} />}
        />
        <Route
          path="/admin/*"
          // element={<Admin />}
          element={<PrivateRoute role="admin" element={<Admin />} />}
        />

        <Route
          path="/nurse/*"
          // element={<Nurse />}
          element={<PrivateRoute role="nurse" element={<Nurse />} />}
        />
        <Route
          path="/clerk/*"
          // element={<Clerk />}
          element={<PrivateRoute role="clerk" element={<Clerk />} />}
        />
        <Route path="*" element={homePage()} />
      </Routes>
    </>
  );
}

function homePage() {
  return <Navigate to={"/"} />;
}

export default App;
