import { fetchData, fetchformData } from "./client";
// POST
export const loginAuth = async (payload) => {
  const data = await fetchData("/accounts/login", "post", payload);

  return data;
};

export const createPatientAppointment = async (payload) => {
  const data = await fetchData(
    `/patients/insertPatientAppointment`,
    "post",
    payload
  );

  return data;
};

export const registerPatient = async (payload) => {
  const data = await fetchData("/accounts/register", "post", payload);

  return data;
};

export const uploadFile = async (formData) => {
  const data = await fetchformData("/accounts/upload", "post", formData);

  return data;
};

export const createPatientLogs = async (payload) => {
  const data = await fetchData("/patients/patientLogs", "post", payload);

  return data;
};

//GET

export const getPatientIdDetails = async (payload) => {
  const data = await fetchData(
    `/accounts/image/${payload.payload.replace(/\s/g, "")}`,
    "get",
    payload
  );
  return data;
};

export const getPatientDetails = async (payload) => {
  const data = await fetchData(
    `/patients/getUserProfile?id=${payload.id}`,
    "get",
    payload
  );

  return data;
};

export const getAppointmentCountByDay = async (payload) => {
  payload.appointmentDate = payload.appointmentDate.replace(/'/g, "");
  const data = await fetchData(
    `patients/getPatientsByDate?reserveDate=${payload.appointmentDate}`,
    "get",
    payload
  );

  return data;
};

export const getPatientTransaction = async ({
  userId,
  startDate = "",
  endDate = "",
  filterByStatus = "All",
}) => {
  let path = `patients/getPatientTransactions?id=${userId}`;

  if (startDate !== "" && endDate !== "" && startDate <= endDate) {
    path += `&startDate=${startDate}&endDate=${endDate}`;
  }

  if (filterByStatus !== "All") {
    path += `&filterByStatus=${filterByStatus}`;
  }
  const data = await fetchData(`${path}`, "get", {
    userId,
    startDate,
    endDate,
    filterByStatus,
  });

  return data;
};

export const getPatientsAppointments = async ({
  search = "",
  filterByStatus = "All",
}) => {
  let path = `/nurse/getPatientsAppointment?filterBystatus=${filterByStatus}`;

  if (search !== "") {
    path += `&search=${search}`;
  }

  const data = await fetchData(`${path}`, "get", {
    search,
    filterByStatus,
  });

  return data;
};

export const getActiveDoctors = async () => {
  let path = `/doctor/getActiveDoctors`;

  const data = await fetchData(`${path}`, "get");

  return data;
};

export const getPatientsAppointment = async (userId) => {
  let path = `/patients/getPatientsAppointmentDetails?userId=${userId}`;

  const data = await fetchData(`${path}`, "get");

  return data;
};

//PUT
export const updatePatientDetails = async (payload) => {
  const data = await fetchData(
    `/patients/updateDetails?id=${payload.id}`,
    "put",
    payload
  );

  return { res: data.data, status: data.status };
};

export const updatePatientAppointment = async (payload) => {
  const { doctor_id, appointment_status } = payload;
  const data = await fetchData(
    `/nurse/getPatientsAppointment?id=${payload.appointmentId}`,
    "put",
    { doctor_id, appointment_status }
  );

  return { res: data.data, status: data.status };
};

export const download = async (payload) => {
  const data = await fetchData(`/accounts/download/${payload}`, "get");

  return { res: data.data, status: data.status };
};

export const getAllUser = async () => {
  const data = await fetchData(`/accounts/getAllUser`, "get");

  return { res: data.data, status: data.status };
};
