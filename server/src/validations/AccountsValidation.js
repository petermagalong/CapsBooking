const Joi = require("joi");

const validator = (schema) => (payload) => schema.validate(payload);

const register = Joi.object({
  first_name: Joi.string().required(),
  middle_name: Joi.string().required(),
  last_name: Joi.string().required(),
  role: Joi.string().valid("admin", "patient", "nurse").required(),
  birthday: Joi.string().required(),
  sex: Joi.string().valid("Male", "Female").required(),
  address: Joi.string().required(),
  email_address: Joi.string().email().required(),
  password: Joi.string().required(),
  contact_number: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  terms_and_condition: Joi.number()
    .valid(1)
    .required()
    .messages({ "any.only": "terms and condition must be true" }),

  //patient
  agency: Joi.string().optional(),
  ec_name: Joi.string()
    .optional()
    .messages({ "any.only": "Emergency Name Not allow to be enmpty" }),
  ec_contact_details: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .optional(),
  ec_address: Joi.string().optional(),
  type_of_id: Joi.string().optional(),
  id_number: Joi.string().optional(),
  file_path: Joi.string().optional(),

  //employee
  sss_num: Joi.string().optional(),
  pagibig_num: Joi.string().optional(),
  philhealth_num: Joi.string().optional(),
  tin_num: Joi.string().optional(),
  emerg_contact: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .optional(),
  emerg_contact_first_name: Joi.string().optional(),
  emerg_contact_last_name: Joi.string().optional(),
});

const login = Joi.object({
  password: Joi.string().required(),
  email_address: Joi.string().email().required(),
});

const update = Joi.object({
  userId: Joi.string().required(),
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
});

module.exports.AccountValidation = {
  validateRegister: validator(register),
  validateLogin: validator(login),
  validateUpdate: validator(update),
};
