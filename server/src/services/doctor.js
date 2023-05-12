const Connection = require("../database/Connection");
const { getUserId } = require("./user");

module.exports = {
  getActiveDoctors: async () => {
    try {
      const query = `select 
        CONCAT(tbl_doctor.first_name, ' ', tbl_doctor.middle_name, ',', tbl_doctor.last_name) as doctor_name,
         doctorId,
         specialization,
         status 
         from tbl_doctor where status='active';`;

      const result = await Connection(query);

      return result;
    } catch (err) {
      return [];
    }
  },
};
