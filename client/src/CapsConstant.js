export const Role = {
  Admin: 'admin',
  Patient: 'patient',
  Nurse: 'nurse',
  Clerk: 'clerk'
}
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
        path: '/user/profile'
      },
      {
        name: 'Reservation',
        path: '/user/reservation'
      },
      {
        name: 'Transaction History',
        path: '/user/transaction-history'
      }
    ],
    paths: '/patient'
  },
  {
    role: "nurse",
    links: [
      {
        name: "Home",
        path: '/user/home'
      },
      {
        name: 'Schedule',
        path: '/user/schedule'
      },
      {
        name: 'Doctor on Board',
        path: '/user/doctors-on-board'
      }
    ],

    paths: '/nurse'
  },
  {
    role: "clerk",
    links: [
      {
        name: "Inventory Items",
        path: '/inventory-items'
      },
      {
        name: 'Supply',
        path: '/user/supply'
      },
    ],
    paths: '/user/clerk'
  },
  {
    role: "admin",
    links: [
      {
        name: "Homes",
        path: '/user/home'
      },
      {
        name: 'User Management',
        path: '/user/user-management'
      },
      {
        name: 'Schedules',
        path: '/user/schedules'
      }
    ],

    paths: '/user/admin'
  },
]
export const columnsTransaction = [
  { field: "transactionId", header: "Transaction ID" },
  { field: "appointment_date", header: "Appointment Date" },
  { field: "test", header: "Test" },
  { field: "status", header: "Status" },
  { field: "result", header: "Result" },
];

                // appointment_date
                // : 
                // "2023-05-08T16:00:00.000Z"
                // appointment_id
                // : 
                // 6
                // date
                // : 
                // "2023-05-03T16:00:00.000Z"
                // result
                // : 
                // "https://www.britannica.com/science/blood-biochemistry"
                // status
                // : 
                // "Completed"
                // test
                // : 
                // "Bloob"
                // transactionId
                // : 
                // 1