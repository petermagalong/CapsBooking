const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { tryCatch } = require("../util/tryCatch");
const AppError = require("../util/AppError");
const { PatientService } = require("../services");
const { getDateToday } = require("../util/dateFormat");
const { PatientValidation } = require("../validations/Nurse.Validation");
const { deleteFile } = require("../util/deleteFile");
const {
  getPatientTransactionResult,
  createPatientTransactionResult,
} = require("../services/patient");
// Define the storage for uploaded files
const storage = multer.diskStorage({
  destination: "uploads/", // Specify the upload directory
  filename: (req, file, cb) => {
    // Customize the filename as per your requirement
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

// Create the multer upload instance
const upload = multer({ storage });

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
  })
);

// transaction
router.get(
  `/getPatientTransactions`,
  tryCatch(async (req, res) => {
    const { transactionId } = req.query;

    console.log(transactionId, "transactionId");
    const result = await PatientService.getPatientTransactionResult({
      id: transactionId,
    });

    res.status(200).send({
      status: result,
      message: "Success",
    });
  })
);

router.put(
  `/getPatientsAppointment`,
  tryCatch(async (req, res) => {
    const { id } = req.query;
    const { doctor_id, appointment_status } = req.body;

    console.log(doctor_id, "filterBystatus", appointment_status);
    const result = await PatientService.updateAppointmentByAppointmentId({
      id,
      doctor_id,
      appointment_status,
    });

    res.status(200).send({
      status: result,
      message: "Success",
    });
  })
);

router.post("/transaction", upload.single("file"), async (req, res) => {
  try {
    const { appointment_id, test, patient_status } = req.body;
    console.log(
      { appointment_id, test, patient_status },
      "{ appointment_id, test, status } "
    );
    if (!req.file) {
      return res.status(400).send({ message: "No file provided" });
    }

    if (!req.body.test)
      return res.status(400).send({ message: "test required" });

    if (!req.body.patient_status)
      return res.status(400).send({ message: "status required" });

    const fileName = req.file.filename;

    const result = await createPatientTransactionResult({
      appointment_id,
      test,
      patient_status,
      result: fileName,
    });

    if (!result) {
      res.status(400).send({ status: result, message: "failed" });
      return;
    }

    res.status(200).send({ status: result, message: "success" });
  } catch (err) {
    // Handle any potential errors
    console.error(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
