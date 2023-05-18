import { fetchData, fetchformData } from "./client";
// POST
export const getInventoryItems = async () => {
  const data = await fetchData("/inventory/getInventoryItems", "get");

  console.log(data, "getInventoryItems");
  return data;
};

export const getAllInventoryItems = async () => {
  const data = await fetchData("/inventory/getAllInventoryItems", "get");

  console.log(data, "getInventoryItems");
  return data;
};

export const getPatientLogsItems = async (id) => {
  const data = await fetchData(
    `/inventory/getPatientsAppointmentLogsDetails?id=${id}`,
    "get"
  );

  console.log(
    data,
    "/inventory/getPatientsAppointmentLogsDetails /getAllSupplier"
  );
  return data;
};

export const getAllSupplier = async () => {
  const data = await fetchData(`/inventory/getAllSupplier`, "get");

  console.log(data, "/inventory/getAllSupplier");
  return data;
};
