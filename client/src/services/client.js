import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});

const makeRequest = async ({
  method = "get",
  url,
  data = {},
  params = {},
  headers = {},
}) => {
  try {
    const response = await api({
      method,
      url,
      data,
      params,
      headers,
    });
    console.log(`URL ${url}`);
    console.log(response, "response API ");
    return { data: response.data, status: response.status };
  } catch (error) {
    if (error.response) {
      // return error.response.data;
      return { data: error.response.data, status: error.response.status };

      // throw new Error(error.response.data.message || "Something went wrong");
    } else if (error.request) {
      console.log(error.request);
      throw new Error("No response received from server");
    } else {
      console.log("Error", error.message);
      throw new Error("Something went wrong");
    }
  }
};

export async function fetchData(url, method, payload) {
  try {
    const data = await makeRequest({
      url,
      method,
      data: payload,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function fetchformData(url, method, payload) {
  // for (let pair of payload.entries()) {
  //   console.log(pair[0], pair[1]);
  // }
  try {
    const data = await makeRequest({
      url,
      method,
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
}
