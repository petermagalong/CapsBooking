export const Role = {
  Admin: "admin",
  Patient: "patient",
  Nurse: "nurse",
  Clerk: "clerk",
};
export const tableData = [
  {
    apointment: 1,
    name: "Bea ",
    address: "vsgerh",
    date: "07/11/2020",
    status: "completed",
  },
  {
    apointment: 2,
    name: "petewr",
    address: "erjhaert",
    date: "07/11/2020",
    status: "completed",
  },
  {
    apointment: 3,
    name: "yoru",
    address: "werhetht",
    date: "07/10/2020",
    status: "completed",
  },
  {
    apointment: 4,
    name: "Sage",
    address: "erjhtryte",
    date: "07/09/2020",
    status: "completed",
  },
  {
    apointment: 5,
    name: "Darren Daniels",
    address: "erjhetjyrs",
    date: "07/07/2020",
    status: "completed",
  },
  {
    apointment: 6,
    name: "Ted McDonald",
    address: "rtjryjy",
    date: "07/07/2020",
    status: "completed",
  },
];
export const sideBarData = [
  {
    role: "patient",
    links: [
      {
        name: "Profile",
        path: "/user/profile",
      },
      {
        name: "Reservation",
        path: "/user/reservation",
      },
      {
        name: "Transaction History",
        path: "/user/transaction-history",
      },
    ],
    paths: "/patient",
  },
  {
    role: "nurse",
    links: [
      {
        name: "Home",
        path: "/nurse/home",
      },
      {
        name: "Schedule",
        path: "/nurse/schedule",
      },
      {
        name: "Doctor on Board",
        path: "/nurse/doctors-on-board",
      },
    ],

    paths: "/nurse",
  },
  {
    role: "clerk",
    links: [
      {
        name: "Inventory Items",
        path: "/clerk/inventory-items",
      },
      {
        name: "Supply",
        path: "/clerk/supply",
      },
    ],
    paths: "/clerk",
  },
  {
    role: "admin",
    links: [
      {
        name: "Homes",
        path: "/admin/home",
      },
      {
        name: "User Management",
        path: "/admin/user-management",
      },
      {
        name: "Schedules",
        path: "/admin/schedules",
      },
    ],

    paths: "/user/admin",
  },
];
export const columnsTransaction = [
  { field: "transactionId", header: "Transaction ID" },
  { field: "appointment_date", header: "Appointment Date" },
  { field: "test", header: "Test" },
  { field: "status", header: "Status" },
  { field: "result", header: "Result" },
];
export const columns = [
  { field: "apointment", header: "Apoitment#" },
  { field: "name", header: "Name" },
  { field: "address", header: "Address" },
  { field: "date", header: "Date" },
  { field: "status", header: "Status" },
];
export const Appointmentcolumns = [
  { field: "appointmentId", header: "Apoitment No" },
  { field: "appointment_date", header: "Appointment Date" },
  { field: "patient_name", header: "Patient Name" },
  { field: "appointment_type", header: "Test" },
  { field: "appointment_status", header: "Status" },
  { field: "doctor_name", header: "Doctor" },
];
export const Doctorscolumns = [
  { field: "doctor_name", header: "Doctors Name" },
  { field: "specialization", header: "Specialization" },
  { field: "status", header: "Status" },
];

export const PatientLogscolumns = [
  { field: "patientLogId", header: "ID" },
  { field: "quantity", header: "Quantity" },
  { field: "list", header: "Item" },
  { field: "patientLogDateTime", header: "Date" },
];

export const PatientTransactioncolumns = [
  { field: "transactionId", header: "transactionId" },
  { field: "date", header: "date" },
  { field: "test", header: "Test" },
  { field: "status", header: "Status" },
  { field: "result", header: "Result" },
];

export const Usercolumns = [
  { field: "userId", header: "User Id" },
  { field: "full_name", header: "Name" },
  { field: "email_address", header: "Email" },
  { field: "role", header: "Role" },
  { field: "sex", header: "Sex" },
  { field: "contact_number", header: "Contact Number" },
];

export const Suppliercolumns = [
  { field: "supplierId", header: "Supplier Id" },
  { field: "name", header: "Name" },
  { field: "contactNumber", header: "Contact Number" },
  { field: "item", header: "Item" },
];

export const Inventorycolumns = [
  { field: "list", header: "List" },
  { field: "deliveryDate", header: "Delivery Date" },
  { field: "quantity", header: "Quantity" },
  { field: "expirationDate", header: "Expiration Date" },
];
