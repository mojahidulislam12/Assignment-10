import { serverFetch } from "../server";

export const getUsers = async (id) => {
  console.log(id);
  const result = await serverFetch(`/api/user/${id}`);
  console.log(result);
  return result;
};
