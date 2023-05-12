import { fetchData } from "./client";

export const loginAuth = async (payload) => {
  const data = await fetchData("/accounts/login", "post", payload);

  console.log(data, "query");
  return data;
};

export const registerPatient = async (payload) => {
  console.log(payload, "payloadregister");
  const data = await fetchData("/accounts/register", "post", payload);

  console.log(data, "query");
  return data;
};

export const getPatientDetails = async (payload) => {
  // console.log(payload, `payloadgetPatientDetails?id=${payload.id}`);
  const data = await fetchData(
    `/patients/getUserProfile?id=${payload.id}`,
    "get",
    payload
  );

  return data;
};

export const updatePatientDetails = async (payload) => {
  console.log(payload, `payloadgetPatientDetails?id=${payload.id}`);
  const data = await fetchData(
    `/patients/updateDetails?id=${payload.id}`,
    "put",
    payload
  );

  console.log(data, "queryupdate");
  return { res: data.data, status: data.status };
};

export const getAppointmentCountByDay = async (payload) => {
  // console.log(payload, `payloadgetPatientDetails?id=${payload.id}`);
  payload.appointmentDate = payload.appointmentDate.replace(/'/g, "");
  const data = await fetchData(
    `patients/getPatientsByDate?reserveDate=${payload.appointmentDate}`,
    "get",
    payload
  );

  console.log(data.data, "dd");

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

export const getPatientTransaction = async ({
  userId,
  startDate = "",
  endDate = "",
  filterByStatus = "All",
}) => {
  // console.log(payload, `payloadgetPatientDetails?id=${payload.id}`);
  console.log({ userId, startDate, endDate, filterByStatus }, "useridmoto");
  let path = `patients/getPatientTransactions?id=${userId}`;

  if (startDate !== "" && endDate !== "" && startDate <= endDate) {
    path += `&startDate=${startDate}&endDate=${endDate}`;
  }

  if (filterByStatus !== "All") {
    path += `&filterByStatus=${filterByStatus}`;
  }

  console.log(path, "pathpathpathpathpathpathpathpathpathpath");
  const data = await fetchData(`${path}`, "get", {
    userId,
    startDate,
    endDate,
    filterByStatus,
  });

  console.log(data.data, "dd");

  return data;
};

export const getPatientsAppointments = async ({
  search = "",
  filterByStatus = "All",
}) => {
  // console.log(payload, `payloadgetPatientDetails?id=${payload.id}`);
  let path = `/nurse/getPatientsAppointment?filterBystatus=${filterByStatus}`;

  if (search !== "") {
    path += `&search=${search}`;
  }

  console.log(path, "pathpathpathpathpathpathpathpathpathpath");
  const data = await fetchData(`${path}`, "get", {
    search,
    filterByStatus,
  });

  console.log(data.data, "dd");

  return data;
};

export const getActiveDoctors = async () => {
  // console.log(payload, `payloadgetPatientDetails?id=${payload.id}`);
  let path = `/doctor/getActiveDoctors`;

  const data = await fetchData(`${path}`, "get");

  console.log(data.data, "dd");

  return data;
};

export const getPatientsAppointment = async (userId) => {
  // console.log(payload, `payloadgetPatientDetails?id=${payload.id}`);
  let path = `/patients/getPatientsAppointmentDetails?userId=${userId}`;

  const data = await fetchData(`${path}`, "get");

  console.log(data.data, "dduck");

  return data;
};
