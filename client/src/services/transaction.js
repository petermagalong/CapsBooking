import { fetchData, fetchformData } from "./client";
// POST

export const getPatientTransactions = async (id) => {
  const data = await fetchData(
    `/nurse/getPatientTransactions?transactionId=${id}`,
    "get"
  );

  console.log(data, "/nurse/getPatientTransactions?transactionId=");
  return data;
};

export const createPatientTransactions = async (payload) => {
  console.log(payload, "payloadpayloadpayloadpayload");
  const data = await fetchformData(`/nurse/transaction`, "post", payload);

  console.log(data, "/nurse/getPatientTransactions?transactionId=");
  return data;
};
