const Joi = require("joi");

const validator = (schema) => (payload) => schema.validate(payload);

//getPatientsAppointment
const getPatientsAppointment = Joi.object({
  search: Joi.string().optional().default(""),
  filterBystatus: Joi.string()
    .valid("all", "pending", "ongoing", "completed")
    .required()
    .default("all"),
});

module.exports.PatientValidation = {
  validateGetgetPatientsAppointment: validator(getPatientsAppointment),
};
