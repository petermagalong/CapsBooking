import "bootstrap/dist/css/bootstrap.min.css";
import "./pages/LandingPage/styles.css";
import HomePage from "./pages/LandingPage/HomePage";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import LogIn from "./pages/LandingPage/LogIn";
import SignUp from "./pages/LandingPage/SignUp";
import PrivateRoute from "./routes/PrivateRoute";
import { useEffect, useState } from "react";
import Patient from "./pages/LandingPage/Form/User";
import Nurse from "./pages/User/Nurse";
import Admin from "./pages/User/Admin";
import Clerk from "./pages/User/Clerk";
function App() {
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

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route
          path="/user/*"
          element={<PrivateRoute role="patient" element={<Patient />} />}
        />
        <Route
          path="/admin/*"
          element={<PrivateRoute role="admin" element={<Admin />} />}
        />
        <Route
          path="/nurse/*"
          element={<PrivateRoute role="nurse" element={<Nurse />} />}
        />
        <Route
          path="/clerk/*"
          element={<PrivateRoute role="clerk" element={<Clerk />} />}
        />
        <Route path="*" element={homePage()} />
      </Routes>
      <Link to={"/home"}>gg</Link>
    </>
  );
}

function homePage() {
  return <Navigate to={"/"} />;
}

export default App;
