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
  `/getAllInventoryItems`,
  tryCatch(async (req, res) => {
    const response = await InventoryService.getInventory();

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

router.get(
  `/getAllSupplier`,
  tryCatch(async (req, res) => {
    const response = await InventoryService.getAllSupplier();

    res.status(200).send({
      status: response,
      message: "Success",
    });
  })
);

router.post(
  `/createInventoryItem`,
  tryCatch(async (req, res) => {
    console.log(req.body, 'bitch')
    const response = await InventoryService.createInventoryItem(req.body);


    res.status(200).send({
      status: response,
      message: 'success'
    })
  })
)

module.exports = router;
