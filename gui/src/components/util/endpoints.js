import axios from "axios";

export const createAccount = async (values, role) => {
  console.log(values)
  const result = await axios.post(
    `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/createUser`,
    { ...values, role: role }
  );

  return result;
};

export const getAdminToken = async (credentials) => {
  const result = await axios.post(
    `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/jwt/authenticate`,
    credentials
  );

  return result;
};

export const getCentralToken = async (credentials) => {
  const result = await axios.post(
    `${window.ENVIRONMENT.AGILE_CENTRAL}/v1/jwt/authenticate`,
    credentials
  );

  return result;
};

export const getAllProjects = async (token) => {
  const result = await axios.get(
    `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/projects/getAllProjects`,
    {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }
  );

  return result.data;
};
