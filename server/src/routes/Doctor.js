const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const moment = require("moment");

const { tryCatch } = require("../util/tryCatch");
const AppError = require("../util/AppError");
const { DoctorService, UserService } = require("../services");
const { PatientValidation } = require("../validations/PatientValidation");

router.get(
  `/getActiveDoctors`,
  tryCatch(async (req, res) => {
    const response = await DoctorService.getActiveDoctors();

    res.status(200).send({
      status: response,
      message: "Success",
    });
  })
);

module.exports = router;
