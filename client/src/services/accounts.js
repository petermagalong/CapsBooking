import { fetchData } from "./client";

export const loginAuth = async (payload) => {
  const  data = await fetchData("/accounts/login", "post", payload);

  console.log(data, "query");
  return data;
};