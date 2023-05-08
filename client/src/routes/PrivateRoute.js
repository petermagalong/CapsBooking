import { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

function PrivateRoute({ element, role, ...rest }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("role");

    if (!isLoggedIn) {
      navigate("/login", { state: { from: location } });
    } else if (role && userRole !== role) {
      console.log("heyyy", role && userRole !== role);
      navigate("/");
    }
  }, [navigate, location, role]);

  return <Outlet />;
}

export default PrivateRoute;
