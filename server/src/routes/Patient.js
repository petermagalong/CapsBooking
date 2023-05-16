const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const moment = require("moment");

const { tryCatch } = require("../util/tryCatch");
const AppError = require("../util/AppError");
const { PatientService, UserService } = require("../services");
const { PatientValidation } = require("../validations/PatientValidation");
const {
  getAge,
  getFormatDateToday,
  getAgeFromDate,
} = require("../util/dateFormat");
const {
  getPatientAppointmentNotExist,
  createAppointment,
  createPatientLogs,
} = require("../services/patient");
const { updateInventoryItems } = require("../services/inventory");

router.get(
  `/getUserProfile`,
  tryCatch(async (req, res) => {
    const { id } = req.query;

    const response = await PatientService.getPatientInfoByUserId({
      id,
    });

    if (response.length < 1) {
      throw new AppError(false, "User not Found", 404);
    }

    res.status(200).send({
      status: response[0],
      message: "Success",
    });
  })
);

//http://localhost:3001/patients/getPatientTransactions?id=32&status=all&startDate=2023-05-04&endDate=2023-05-04
router.get(
  `/getPatientTransactions`,
  tryCatch(async (req, res) => {
    const { id, filterByStatus, startDate, endDate } = req.query;

    const response = await PatientService.getPatientTransactionByUserId({
      id,
      filterByStatus,
      startDate,
      endDate,
    });

    res.status(200).send({
      status: response,
      message: "Success",
    });
  })
);

router.put(
  `/changePassword`,
  tryCatch(async (req, res) => {
    const { email_address, password, newPassword, confirmPassword } = req.body;

    if (confirmPassword !== newPassword) {
      throw new AppError(false, "Password not match.", 400);
    }

    const userDetails = await UserService.getUserByEmail({ email_address });
    if (!userDetails) {
      throw new AppError(false, "Invalid Email not exist", 400);
    }

    const isMatch = await bcrypt.compareSync(password, userDetails.password);

    if (!isMatch) {
      throw new AppError(false, "Incorect password", 400);
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = String(bcrypt.hashSync(newPassword, salt));

    const result = await PatientService.changePassword({
      id: userDetails.userId,
      password: hashPassword,
    });

    if (!result) {
      throw new AppError(false, "Patient not update", 400);
    }

    delete userDetails.password;
    res.status(200).send({
      status: result,
      message: "Success",
    });
  }, PatientValidation.validateChangePatientPassword)
);

router.put(
  `/updateDetails`,
  tryCatch(async (req, res) => {
    const myAge = moment().diff(req.body.birthday, "years");
    if (myAge < 5) {
      throw new AppError(false, "Invalid Age Below 5 years old", 400);
    }

    req.body.birthday = moment(req.body.birthday).format("YYYY-MM-DD");
    console.log(req.body.birthday, "req.body.birthday");
    const {
      first_name,
      last_name,
      role,
      middle_name,
      birthday,
      sex,
      address,
      contact_number,
    } = req.body;
    const userData = await UserService.getUserById({
      userId: req.query.id,
    });

    if (userData.length < 1) {
      throw new AppError(false, "Invalid UserId not found", 404);
    }

    const userInfo = {
      first_name: first_name || userData[0].first_name,
      last_name: last_name || userData[0].last_name,
      role: role || userData[0].role,
      middle_name: middle_name || userData[0].middle_name,
      birthday:
        getFormatDateToday(birthday) ||
        getFormatDateToday(userData[0].birthday),
      sex: sex || userData[0].sex,
      address: address || userData[0].address,
      contact_number: contact_number || userData[0].contact_number,
    };

    const results = await UserService.updateUserInfo({
      id: req.query.id,
      ...userInfo,
    });

    if (results && role === "patient") {
      const {
        agency,
        ec_name,
        ec_contact_details,
        ec_address,
        type_of_id,
        id_number,
        file_path,
      } = req.body;

      const { id } = req.query;
      console.log(req.query);
      const patientDetails = await PatientService.getPatient({
        id,
      });

      if (!patientDetails) {
        throw new AppError(false, "Patient not found", 400);
      }

      const toUpdateDetails = {
        user_id: id,
        agency: agency || patientDetails.agency,
        ec_name: ec_name || patientDetails.ec_name,
        ec_contact_details:
          ec_contact_details || patientDetails.ec_contact_details,
        ec_address: ec_address || patientDetails.ec_address,
        type_of_id: type_of_id || patientDetails.type_of_id,
        id_number: id_number || patientDetails.id_number,
        file_path: file_path || patientDetails.file_path,
      };
      const result = PatientService.updatePatientDetails(toUpdateDetails);

      if (!result) {
        throw new AppError(false, "Patient not update", 400);
      }
      res.status(200).send({
        status: true,
        message: "Update success2",
      });
      return;
    }
    res.status(200).send({
      status: true,
      message: "Update success1",
    });
  }, PatientValidation.validateUpdatePatientDetails)
);

router.get(
  `/getPatientAppointment`,
  tryCatch(async (req, res) => {
    const { id } = req.query;

    const response = await PatientService.getPatientInfoByUserId({
      id,
    });

    if (response.length < 1) {
      throw new AppError(false, "User not Found", 404);
    }

    console.log({ id: response[0].patientId });
    const result = await PatientService.getPatientAppointmentByPatientId({
      id: response[0].patientId,
    });

    res.status(200).send({
      status: result,
      message: "Success",
    });
  })
);

router.get(
  `/getPatientsByDate`,
  tryCatch(async (req, res) => {
    const { reserveDate } = req.query;

    const response = await PatientService.getPatientCountbyDate({
      reserveDate,
    });

    res.status(200).send({
      status: response,
      message: "Success",
    });
  })
);

router.post(
  `/insertPatientAppointment`,
  tryCatch(async (req, res) => {
    const { appointment_date, appointment_type, userId } = req.body;

    const response = await PatientService.getPatient({
      id: userId,
    });

    if (!response) throw new AppError(false, "User not Found", 404);

    console.log(response);
    const isNotExist = await getPatientAppointmentNotExist(response);

    console.log(isNotExist, "isNotExist");
    if (!isNotExist || !isNotExist?.totalNumberOfappointment)
      throw new AppError(false, "User Already Had a Appointment.", 404);

    const payload = {
      patientId: response.patientId,
      appointment_date,
      appointment_type,
    };
    const result = await createAppointment(payload);
    console.log(result, "ggresult");
    if (!result) throw new AppError(false, "Appointment Not Created.", 400);

    res.status(200).send({
      status: true,
      message: "Success",
    });
  }, PatientValidation.validateCreatePatientAppointment)
);



router.get(
  `/getPatientsAppointmentDetails`,
  tryCatch(async (req, res) => {
    const { userId } = req.query;

    const response = await PatientService.getPatientOngoingAppointment({
      userId,
    });

    res.status(200).send({
      status: response,
      message: "Success",
    });
  })
);

router.post(
  `/patientLogs`,
  tryCatch(async (req, res) => {
    const { inventoryId, appointmentId, quantity, spot } = req.body;

    if (quantity <= 0) {
      res.status(400).send({
        status: false,
        message: `Invalid Value ${quantity}`,
      });
      return;
    }

    const updateResult = await updateInventoryItems({ inventoryId, quantity });

    if (!updateResult)
      throw new AppError(false, "update inventory item failed", 400);

    const result = await createPatientLogs({
      inventoryId,
      appointmentId,
      quantity,
      spot,
    });
    res.status(200).send({
      status: result,
      message: "Success",
    });
  }, PatientValidation.validateCreatePatientLogs)
);

module.exports = router;
