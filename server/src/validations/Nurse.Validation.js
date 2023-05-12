const Joi = require("joi");

const validator = (schema) => (payload) => schema.validate(payload);

//getPatientsAppointment
const getPatientsAppointment = Joi.object({
  search: Joi.string().optional().default(""),
  filterBystatus: Joi.string()
    .valid("All", "Pending", "Ongoing", "Completed")
    .required()
    .default("all"),
});

module.exports.PatientValidation = {
  validateGetgetPatientsAppointment: validator(getPatientsAppointment),
};
