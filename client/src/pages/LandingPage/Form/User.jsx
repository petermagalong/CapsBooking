// import "./App.css";
import { useParams } from "react-router-dom";
import { tableData } from "../../../CapsConstant";
import UserSidebar from "../../../components/UserSidebar";
import UserTable from "../../../components/UserTable";

const role = localStorage.getItem('role')
console.log(role, 'role')
// const userChecker = () => {
//   if (role === "Patient")
// }
function Users() {
  return (
    <>
      <UserSidebar />
    </>
  );
}

export default Users;
