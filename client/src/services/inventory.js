import { fetchData, fetchformData } from "./client";
// POST
export const getInventoryItems = async () => {
  const data = await fetchData("/inventory/getInventoryItems", "get");

  console.log(data, "getInventoryItems");
  return data;
};

export const getPatientLogsItems = async (id) => {
  const data = await fetchData(
    `/inventory/getPatientsAppointmentLogsDetails?id=${id}`,
    "get"
  );

  console.log(data, "/inventory/getPatientsAppointmentLogsDetails");
  return data;
};
