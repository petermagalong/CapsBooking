const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { tryCatch } = require("../util/tryCatch");
const AppError = require("../util/AppError");
const { AccountValidation } = require("../validations/AccountsValidation");
const { UserService, PatientService, EmployeeService } = require("../services");
const { getAge } = require("../util/dateFormat");
const {
  updatePatientIdDetails,
  getPatientInfoByUserId,
} = require("../services/patient");
const { deleteFile } = require("../util/deleteFile");
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

router.post(
  `/register`,
  tryCatch(async (req, res) => {
    const pass1 = req.body.password;

    const salt = bcrypt.genSaltSync(10);
    req.body.password = String(bcrypt.hashSync(pass1, salt));

    const {
      first_name,
      last_name,
      role,
      middle_name,
      birthday,
      sex,
      address,
      contact_number,
      email_address,
      terms_and_condition,
      password,
      agency,
      ec_name,
      ec_contact_details,
      ec_address,
      type_of_id,
      id_number,
      file_path,
      sss_num,
      pagibig_num,
      philhealth_num,
      tin_num,
      emerg_contact,
      emerg_contact_first_name,
      emerg_contact_last_name,
    } = req.body;

    const myAge = getAge(birthday);
    if (myAge.years < 5) {
      throw new AppError(false, "Invalid Age Below 5 years old", 400);
    }

    const val = await UserService.getUser({ email_address });

    if (val[0].email_count > 0) {
      throw new AppError(false, "Email Already Exist!", 500);
    }

    const results = await UserService.register({
      first_name,
      last_name,
      role,
      middle_name,
      birthday,
      sex,
      address,
      contact_number,
      email_address,
      terms_and_condition,
      password,
    });

    if (results) {
      if (role === "patient") {
        const patientDetails = {
          email_address,
          agency,
          ec_name,
          ec_contact_details,
          ec_address,
          type_of_id,
          id_number,
          file_path,
        };
        const result = await PatientService.registerPatient(patientDetails);

        if (result) {
          res.status(200).send({
            status: results,
            message: "Patient Successfully Created!",
          });
          return;
        } else throw new Error("Patient details Not Created! ");
      }

      if (role === "nurse" || role === "clerk") {
        const employeeDetails = {
          email_address,
          sss_num,
          pagibig_num,
          philhealth_num,
          tin_num,
          emerg_contact,
          emerg_contact_first_name,
          emerg_contact_last_name,
        };

        const result = await EmployeeService.registerEmployee(employeeDetails);
        if (result) {
          res.status(200).send({
            status: results,
            message: "Nurse Successfully Created!",
          });
          return;
        } else throw new Error("Patient details Not Created! ");
      }

      res.status(200).send({
        status: results,
        message: "Admin Successfully Created!",
      });
    } else {
      throw new Error("Not Created!");
    }
  }, AccountValidation.validateRegister)
);

router.post(
  `/login`,
  tryCatch(async (req, res) => {
    const { email_address, password } = req.body;

    const userDetails = await UserService.getUserByEmail({ email_address });
    if (!userDetails) {
      throw new AppError(false, "Invalid Email not exist", 400);
    }

    const isMatch = await bcrypt.compareSync(password, userDetails.password);

    if (!isMatch) {
      throw new AppError(false, "Incorect password", 400);
    }

    delete userDetails.password;
    res.status(200).send({
      status: userDetails,
      message: "Success",
    });
  }, AccountValidation.validateLogin)
);

router.put(
  `/updateInfo`,
  tryCatch(async (req, res) => {
    const {
      first_name,
      last_name,
      role,
      middle_name,
      birthday,
      sex,
      address,
      contact_number,
      terms_and_condition,
    } = req.body;
    const userData = await UserService.getUserById({
      userId: req.query.userId,
    });

    if (userData.length < 1) {
      throw new AppError(false, "Invalid UserId not found", 404);
    }

    const userInfo = {
      first_name: first_name || userData[0].first_name,
      last_name: last_name || userData[0].last_name,
      role: role || userData[0].role,
      middle_name: middle_name || userData[0].middle_name,
      birthday: birthday || userData[0].birthday,
      sex: sex || userData[0].sex,
      address: address || userData[0].address,
      contact_number: contact_number || userData[0].contact_number,
      terms_and_condition: terms_and_condition
        ? 1
        : 0 || userData[0].terms_and_condition,
    };

    const result = await UserService.updateUserInfo({
      id: req.query.userId,
      ...userInfo,
    });

    if (result) {
      res.status(200).send({
        status: result,
        message: "Successfully Updated!",
      });
    } else {
      throw new Error("Not Updated!");
    }
  }, AccountValidation.validateUpdate)
);

router.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file provided" });
  }
  if (!req.query.user_id) {
    return res.status(400).send({ message: "No user_id provided" });
  }

  const { user_id } = req.query;
  const result = await getPatientInfoByUserId({ id: user_id });

  if (result.length <= 0) {
    return res.status(400).send({ message: "No user found!" });
  }
  console.log(`${result[0].file_path}:resulta`);
  if (result[0].file_path !== null || result[0].file_path !== "") {
    const filePath = path.join(
      __dirname,
      "../..",
      `uploads`,
      result[0].file_path.replace(/\s/g, "")
    );
    console.log(filePath, "result[0].file_pathresult[0].file_path");
    await deleteFile(filePath);
  }
  console.log(result, " result");
  const fileName = req.file.filename;
  await updatePatientIdDetails({ user_id, file_path: fileName });

  res.status(200).send({ status: `${fileName}`, message: "success" });
});

router.get("/download/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "../..", "uploads", fileName);

  res.download(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send("File not found");
    }
  });
});

router.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "../..", "uploads", filename);

  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File does not exist
      res.status(404).send({ status: false, message: "Image not found" });
    } else {
      // File exists, send it as a response
      console.log(imagePath, "imagePathimagePath");
      res.send(filename);
    }
  });
});
router.post("/createUser", async (req, res) => {
  const pass1 = req.body.password;

  const salt = bcrypt.genSaltSync(10);
  req.body.password = String(bcrypt.hashSync(pass1, salt));

  const {
    first_name,
    last_name,
    role,
    middle_name,
    birthday,
    sex,
    address,
    contact_number,
    email_address,
    terms_and_condition,
    password,
  } = req.body;

  const myAge = getAge(birthday);
  if (myAge.years < 5) {
    throw new AppError(false, "Invalid Age Below 5 years old", 400);
  }

  const val = await UserService.getUser({ email_address });

  if (val[0].email_count > 0) {
    throw new AppError(false, "Email Already Exist!", 500);
  }

  const results = await UserService.register({
    first_name,
    last_name,
    role,
    middle_name,
    birthday,
    sex,
    address,
    contact_number,
    email_address,
    terms_and_condition,
    password,
  });

  if (results) res.status(200).send({ status: true, message: "success" });
  res.status(400).send({ status: false, message: "insert failed" });
});

router.get(
  `/getAllUser`,
  tryCatch(async (req, res) => {
    const response = await PatientService.getAllUser();

    res.status(200).send({
      status: response,
      message: "Success",
    });
  })
);

module.exports = router;
