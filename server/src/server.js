const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

/* Middleware */
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

/* Routes */
const accountsRoute = require("./routes/Accounts");
const patientsRoute = require("./routes/Patient");
const nurseRoute = require("./routes/Nurse");
const doctorRoute = require("./routes/Doctor");
const errorHandler = require("./middleware/errorHandler");

app.use("/accounts", accountsRoute);
app.use("/patients", patientsRoute);
app.use("/nurse", nurseRoute);
app.use("/doctor", doctorRoute);

app.use(errorHandler);
const port = 3001;

app.listen(port, () => {
  console.log("Listening on port: ", port);
});
