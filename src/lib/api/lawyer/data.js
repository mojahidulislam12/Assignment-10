import { serverFetch } from "../server";

export const getLawyer = async (query) => {
  const result = await serverFetch(`/api/lawyer?${query}`);
  return result;
};

export const getLawyers = async (lawyerId) => {
  const result = await serverFetch(`/api/lawyer?lawyerId=${lawyerId}`);
  return result;
};
export const getAllLawyers = async () => {
  const result = await serverFetch(`/api/lawyer`);
  console.log(result);
  return result;
};
