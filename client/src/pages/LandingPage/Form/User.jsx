
// import "./App.css";
import { tableData } from "../../../CapsConstant";
import UserTable from "../../../components/UserTable";



function Users() {
  const columns = [
    { field: "apointment", header: "Apoitment#" },
    { field: "name", header: "Name" },
    { field: "address", header: "Address" },
    { field: "date", header: "Date" },
    { field: "status", header: "Status" },
    { field: "results", header: "Result" },
    { field: "log", header: "log" },
  ];

  return (
    <div>
      <UserTable data={tableData} columns={columns} hover={true} striped={true} />
    </div>
  );
}

export default Users;
