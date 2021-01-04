import axios from "axios";

export const createAccount = async (values, role) => {

  const result = await axios.post(`${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/createUser`, {...values, role: role});

  console.log(result);

  return result;
};


export const getToken = async (credentials) => {

  const result = await axios.post(`${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/jwt/authenticate`, credentials);

  console.log(result);

  return result;
};
