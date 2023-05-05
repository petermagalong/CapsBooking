const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { tryCatch } = require("../util/tryCatch");
const AppError = require("../util/AppError");
const { PatientService } = require("../services");
const { getDateToday } = require("../util/dateFormat");
const { PatientValidation } = require("../validations/Nurse.Validation");

router.get(
  `/summary`,
  tryCatch(async (req, res) => {
    const today = getDateToday();
    console.log(today);
    const patientDetails = await PatientService.getTotalNumberOfPatient(today);

    if (!patientDetails) {
      throw new AppError(false, "Patient not found", 400);
    }

    res.status(200).send({
      status: patientDetails,
      message: "Success",
    });
  })
);

router.get(
  `/getPatientsAppointment`,
  tryCatch(async (req, res) => {
    const { search, filterBystatus } = req.query;

    console.log(filterBystatus, "filterBystatus");
    const result = await PatientService.getPatientAppointment({
      search,
      filterBystatus,
    });

    res.status(200).send({
      status: result,
      message: "Success",
    });
  }, PatientValidation.validateGetgetPatientsAppointment)
);

module.exports = router;
