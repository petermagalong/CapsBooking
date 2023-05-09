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
