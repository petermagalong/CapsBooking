const Joi = require("joi");

const validator = (schema) => (payload) => schema.validate(payload);

const getPatientInfo = Joi.object({
  id: Joi.string().required(),
});

const getPatientTransaction = Joi.object({
  id: Joi.string().required(),
  status: Joi.string().optional().default("all"),
  startDate: Joi.string().optional().default(""),
  endDate: Joi.string().optional().default(""),
});

const UpdateChangePassword = Joi.object({
  email_address: Joi.string().email().required(),
  password: Joi.string().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().required(),
});

const UpdatePatientDetails = Joi.object({
  id: Joi.string().required(),
  first_name: Joi.string().optional(),
  middle_name: Joi.string().optional(),
  last_name: Joi.string().optional(),
  role: Joi.string().optional(),
  birthday: Joi.string().optional(),
  sex: Joi.string().valid("Male", "Female").optional(),
  address: Joi.string().optional(),
  terms_and_condition: Joi.boolean().optional(),
  contact_number: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .optional(),
  agency: Joi.string().optional(),
  ec_name: Joi.string().optional(),
  ec_contact_details: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .optional(),
  ec_address: Joi.string().optional(),
  type_of_id: Joi.string().optional(),
  id_number: Joi.string().optional(),
  file_path: Joi.string().optional(),
});

module.exports.PatientValidation = {
  validateGetPatientInfo: validator(getPatientInfo),
  validateGetPatientTransaction: validator(getPatientTransaction),
  validateChangePatientPassword: validator(UpdateChangePassword),
  validateUpdatePatientDetails: validator(UpdatePatientDetails),
};
