import { serverFetch } from "../server";

export const getUsers = async (id) => {
  console.log(id);
  const result = await serverFetch(`/api/user/${id}`);
  console.log(result);
  return result;
};

export const getAllUsers = async () => {
  const result = await serverFetch(`/api/user`);
  console.log(result);
  return result;
};
export const getAllApplicant = async () => {
  const result = await serverFetch(`/api/application`);
  console.log(result);
  return result;
};

export const getApplicationByApplicant = async (clientId) => {
  const result = await serverFetch(`/api/application?clientId/${clientId}`);
  console.log(result);
  return result;
};
