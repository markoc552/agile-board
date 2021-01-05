import axios from "axios";

export const createAccount = async (values, role) => {

  const result = await axios.post(`${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/user/createUser`, {...values, role: role});

  return result;
};


export const getToken = async (credentials) => {

  const result = await axios.post(`${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/jwt/authenticate`, credentials);

  return result;
};

export const callProjectService = async (values, endpoint) => {

  const result = await

  return result;
};

export const getProject = async (request, endpoint, param) => {

  const result = await axios.post(`${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/projects/${endpoint}`, {param: request});

  return result;

}

export const getAllProjects = async () => {

  const result = await axios.get(`${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/projects/getAllProjects`);

  return result.data;
}
