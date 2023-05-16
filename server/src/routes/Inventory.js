const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const moment = require("moment");

const { tryCatch } = require("../util/tryCatch");
const AppError = require("../util/AppError");
const {
  InventoryService,
  UserService,
  PatientService,
} = require("../services");
const { PatientValidation } = require("../validations/PatientValidation");

router.get(
  `/getInventoryItems`,
  tryCatch(async (req, res) => {
    const response = await InventoryService.getInventoryItems();

    res.status(200).send({
      status: response,
      message: "Success",
    });
  })
);

router.get(
  `/getPatientsAppointmentLogsDetails`,
  tryCatch(async (req, res) => {
    const { id } = req.query;

    const response = await PatientService.getPatientLogs({
      id,
    });

    res.status(200).send({
      status: response,
      message: "Success",
    });
  })
);

module.exports = router;
