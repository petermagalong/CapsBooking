const Connection = require("../database/Connection");
const { getUserId } = require("./user");
const fs = require("fs");

module.exports = {
  //POST
  createPatientTransactionResult: async (params) => {
    try {
      const { appointment_id, test, patient_status, result } = params;

      let query = `INSERT INTO 
        tbl_transaction VALUES (null,'${appointment_id}',NOW(),'${test}','${patient_status}','${result}') `;

      console.log(query, "getPatientTransactionResult");
      await Connection(query);

      return true;
    } catch (err) {
      return false;
    }
  },
  changePassword: async (params) => {
    try {
      const { id, password } = params;

      const query =
        `UPDATE ` +
        `tbl_user ` +
        `SET ` +
        ` password = '${password}' ` +
        `WHERE ` +
        `userId = ${id}`;

      await Connection(query);

      return true;
    } catch (err) {
      return false;
    }
  },
  registerPatient: async (params) => {
    try {
      const {
        email_address,
        agency,
        ec_name,
        ec_contact_details,
        ec_address,
        type_of_id,
        id_number,
        file_path,
      } = params;

      const userId = await getUserId({ email_address });
      if (userId) {
        const query =
          `INSERT INTO ` +
          `tbl_patient ` +
          `VALUES ` +
          `(null,${userId},
          '${agency}',
          '${ec_name}',
          '${ec_contact_details}',
          '${ec_address}',
          '${type_of_id}',
          '${id_number}',
          '${file_path}'
           )`;

        await Connection(query);
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  },
  createAppointment: async (payload) => {
    try {
      const patientPendingQuery = `INSERT INTO tbl_appointment
      (appointmentId, appointment_date, patient_id, doctor_id,
         appointment_type, code, appointment_status) 
      VALUES ('',
            '${payload.appointment_date}',
            '${payload.patientId}',
            null,
            '${payload.appointment_type}','','pending')
      `;

      console.log(
        patientPendingQuery,
        "patientPendingQuerypatientPendingQuery"
      );
      await Connection(patientPendingQuery);

      return true;
    } catch (err) {
      return false;
    }
  },
  createPatientLogs: async (params) => {
    try {
      const { inventoryId, appointmentId, quantity, spot } = params;

      const query =
        `INSERT INTO ` +
        `tbl_patient_logs ` +
        `VALUES ` +
        `(null,${inventoryId},
          '${appointmentId}',
          '${quantity}',
          '${spot}',
          NOW()
           )`;

      await Connection(query);
      return true;
    } catch (err) {
      return false;
    }
  },

  //GET
  getAllUser: async () => {
    try {
      const query = `SELECT * ,
      CONCAT(first_name, " ",middle_name," ", last_name ) as full_name, 
      "" as password
      FROM tbl_user ;`;
      console.log(query);
      const result = await Connection(query);

      return result;
    } catch (err) {
      return [];
    }
  },

  getPatientInfoByUserId: async (params) => {
    try {
      const { id } = params;

      const query = `SELECT * , "" as password
      FROM tbl_user 
      INNER JOIN tbl_patient
      ON tbl_user.userId=tbl_patient.user_id 
      where tbl_user.userId = '${id}' limit 1`;
      console.log(query);
      const result = await Connection(query);

      return result;
    } catch (err) {
      return [];
    }
  },
  getPatientLogs: async (params) => {
    try {
      const { id } = params;

      const query = `SELECT tbl_patient_logs.* , tbl_inventory.list 
      FROM tbl_patient_logs 
      INNER JOIN tbl_inventory
      ON tbl_patient_logs.inventoryId=tbl_inventory.inventoryId  
      INNER JOIN tbl_appointment 
      ON tbl_appointment.appointmentId=tbl_patient_logs.appointmentId  
      where tbl_patient_logs.appointmentId = '${id}' 
      order by tbl_patient_logs.patientLogDateTime desc`;

      const result = await Connection(query);

      return result;
    } catch (err) {
      return [];
    }
  },
  getPatientCountbyDate: async (params) => {
    try {
      const { reserveDate } = params;

      const query = `SELECT count(*) as reserve_patient FROM tbl_appointment where appointment_date = '${reserveDate}' LIMIT 1`;
      const result = await Connection(query);

      return result[0];
    } catch (err) {
      return 0;
    }
  },
  getPatientOngoingAppointment: async (params) => {
    try {
      const { userId } = params;

      const query = `SELECT 
      DATE_FORMAT(tbl_appointment.appointment_date,'%Y-%m-%d') as appointment_date, 
      appointment_type,
      code,
      appointment_status 
      FROM tbl_appointment
      Inner join tbl_patient 
      On tbl_appointment.patient_id = tbl_patient.patientId 
      where tbl_patient.user_id = '${userId}' 
      and tbl_appointment.appointment_status != 'completed' 
      and tbl_appointment.appointment_status != 'canceled'
       LIMIT 1`;

      console.log(query);
      const result = await Connection(query);

      return result;
    } catch (err) {
      return [];
    }
  },
  getPatientTransactionByUserId: async (params) => {
    try {
      const { id, filterByStatus, startDate, endDate } = params;

      let query = `SELECT 
      DATE_FORMAT(tbl_appointment.appointment_date,'%Y-%m-%d') as appointment_date, 
      tbl_transaction.*
      FROM tbl_user 
      INNER JOIN tbl_patient  ON tbl_user.userId = tbl_patient.user_id 
      INNER JOIN tbl_appointment ON tbl_patient.patientId = tbl_appointment.patient_id 
      INNER JOIN tbl_transaction ON tbl_transaction.appointment_id = tbl_appointment.appointmentId 
      where tbl_user.userId = '${id}'`;

      if (filterByStatus !== undefined && filterByStatus !== "All") {
        query = query.concat(
          " ",
          `AND tbl_transaction.status = '${filterByStatus}'`
        );
      }
      if (startDate && endDate) {
        query = query.concat(
          " ",
          `AND STR_TO_DATE(tbl_transaction.date) BETWEEN STR_TO_DATE('${startDate}', '%Y-%m-%d') AND STR_TO_DATE('${endDate}', '%Y-%m-%d') `
        );
      }
      query = query.concat(" ", `ORDER BY tbl_transaction.date ASC`);
      console.log(query);
      const result = await Connection(query);

      return result;
    } catch (err) {
      return [];
    }
  },

  getPatientTransactionResult: async (params) => {
    try {
      const { id } = params;

      let query = `SELECT 
       tbl_transaction.* ,
       DATE_FORMAT(date,'%Y-%m-%d') as date
       FROM tbl_transaction 
       where appointment_id = '${id}' `;

      console.log(query, "getPatientTransactionResult");
      const result = await Connection(query);

      console.log(result, "getPatientTransactionResult");
      return result;
    } catch (err) {
      return [];
    }
  },

  getPatientAppointmentByPatientId: async (params) => {
    try {
      const { id } = params;

      let query = `SELECT 
      tbl_appointment.* ,
      tbl_doctor.*,
      FROM tbl_patient 
      INNER JOIN tbl_appointment ON tbl_patient.patientId = tbl_appointment.patient_id 
      INNER JOIN tbl_doctor ON tbl_appointment.doctor_id  = tbl_doctor.doctorId
      where tbl_patient.patientId = '${id}';`;
      console.log(query, "query");
      const result = await Connection(query);

      console.log(result);
      return result;
    } catch (err) {
      return [];
    }
  },

  updateAppointmentByAppointmentId: async (payload) => {
    try {
      const { id, doctor_id, appointment_status } = payload;

      let query = `Update  tbl_appointment
      set doctor_id =${doctor_id} ,
       appointment_status ='${appointment_status}' 
      where appointmentId =${id}
      `;
      console.log(query, "query");
      await Connection(query);

      return true;
    } catch (err) {
      return false;
    }
  },
  getPatientAppointment: async (params) => {
    try {
      const { search, filterBystatus } = params;

      let query =
        // `SELECT tbl_appointment.* ,

        ` SELECT  tbl_appointment.*,
        DATE_FORMAT(tbl_appointment.appointment_date,'%Y-%m-%d') as appointment_date ,
        CONCAT(tbl_doctor.first_name, ' ', tbl_doctor.middle_name, ',', tbl_doctor.last_name) as doctor_name,
        tbl_doctor.specialization,
        tbl_doctor.status,
        tbl_patient.ec_name, 
        tbl_patient.ec_contact_details, 
        tbl_patient.ec_address, 
        CONCAT(tbl_user.first_name, ' ', tbl_user.middle_name, ' ', tbl_user.last_name) AS patient_name
        FROM tbl_user
        INNER JOIN tbl_patient ON tbl_user.userId = tbl_patient.user_id
        INNER JOIN tbl_appointment ON tbl_patient.patientId = tbl_appointment.patient_id
        LEFT JOIN tbl_doctor ON tbl_doctor.doctorId = tbl_appointment.doctor_id `;

      if (filterBystatus && filterBystatus !== "All") {
        query += ` Where tbl_appointment.appointment_status = '${filterBystatus}' `;
      }

      if (search && search !== "" && filterBystatus === "All") {
        query += ` WHERE CONCAT(tbl_user.first_name, ' ', tbl_user.middle_name, ' ', tbl_user.last_name) LIKE '%${search}%' 
         OR CONCAT(tbl_doctor.first_name, ' ', tbl_doctor.middle_name, ',', tbl_doctor.last_name) LIKE '%${search}%' 
         OR tbl_appointment.appointment_type LIKE '%${search}%' OR tbl_appointment.appointment_date LIKE '%${search}%' 
         OR tbl_appointment.appointmentId  LIKE '%${search}%' 
         OR tbl_appointment.appointment_status LIKE '%${search}%' 
         ORDER BY tbl_appointment.appointment_date DESC ;`;
      }

      if (search && search !== "" && filterBystatus !== "All") {
        query += ` AND (CONCAT(tbl_user.first_name, ' ', tbl_user.middle_name, ' ', tbl_user.last_name) LIKE '%${search}%' 
         OR CONCAT(tbl_doctor.first_name, ' ', tbl_doctor.middle_name, ',', tbl_doctor.last_name) LIKE '%${search}%' 
         OR tbl_appointment.appointment_type LIKE '%${search}%' OR tbl_appointment.appointment_date LIKE '%${search}%' 
         OR tbl_appointment.appointmentId  LIKE '%${search}%')
         ORDER BY tbl_appointment.appointment_date DESC ;`;
      }

      console.log(query);

      const result = await Connection(query);
      return result;
    } catch (err) {
      return [];
    }
  },

  getPatient: async (params) => {
    try {
      const { id } = params;
      const query =
        `Select * from  tbl_patient ` + `WHERE ` + `user_id = ${id} limit 1`;
      console.log(query, "query");
      const result = await Connection(query);

      return result[0];
    } catch (err) {
      return false;
    }
  },
  getTotalNumberOfPatient: async (today) => {
    try {
      const patientQuery = `Select count(*) as total_patient from tbl_appointment
                            WHERE appointment_date =  '${today}'
                            LIMIT 1;`;

      const totalNumberOfPatient = await Connection(patientQuery);

      const patientPendingQuery = `Select count(*) as total_pending from  tbl_patient 
                                  INNER JOIN tbl_appointment 
                                  ON tbl_appointment.patient_id = tbl_patient.patientId
                                  Where tbl_appointment.appointment_status =  'pending' 
                                  AND tbl_appointment.appointment_date =  '${today}' 
                                  Limit 1
                                  `;

      const totalNumberOfPending = await Connection(patientPendingQuery);
      console.log(totalNumberOfPending, "totalNumberOfPending");

      const patientCompletedQuery = `Select count(*) as total_completed from  tbl_patient 
      INNER JOIN tbl_appointment 
      ON tbl_appointment.patient_id = tbl_patient.patientId
      Where tbl_appointment.appointment_status =  'complete' 
      AND tbl_appointment.appointment_date =  '${today}' 
       Limit 1
      `;

      const totalNumberOfCompleted = await Connection(patientCompletedQuery);

      return {
        ...totalNumberOfPatient[0],
        ...totalNumberOfPending[0],
        ...totalNumberOfCompleted[0],
      };
    } catch (err) {
      return false;
    }
  },

  getPatientAppointmentNotExist: async (payload) => {
    try {
      const patientPendingQuery = `Select count(*) as total_pending from  tbl_patient 
                                  INNER JOIN tbl_appointment 
                                  ON tbl_appointment.patient_id = tbl_patient.patientId
                                  Where tbl_appointment.appointment_status =  'pending' 
                                  AND tbl_appointment.patient_id =  '${payload.patientId}' 
                                  Limit 1
                                  `;

      const totalNumberOfappointment = await Connection(patientPendingQuery);

      return {
        totalNumberOfappointment:
          totalNumberOfappointment[0].total_pending > 0 ? false : true,
      };
    } catch (err) {
      return false;
    }
  },

  //PUT

  updatePatientDetails: async (params) => {
    try {
      const {
        user_id,
        agency,
        ec_name,
        ec_contact_details,
        ec_address,
        type_of_id,
        id_number,
        file_path,
      } = params;

      const query = `UPDATE tbl_patient 
        SET 
        agency='${agency}',
        ec_name='${ec_name}',
        ec_contact_details='${ec_contact_details}',
        ec_address='${ec_address}',
        type_of_id='${type_of_id}',
        id_number='${id_number}',
        file_path='${file_path} ' 
        WHERE user_id = ${user_id} `;

      await Connection(query);

      return true;
    } catch (err) {
      return false;
    }
  },

  updatePatientIdDetails: async (params) => {
    try {
      const { user_id, file_path } = params;

      const query = `UPDATE tbl_patient 
        SET 
        file_path='${file_path} ' 
        WHERE user_id = ${user_id} `;

      await Connection(query);

      return true;
    } catch (err) {
      return false;
    }
  },
};
