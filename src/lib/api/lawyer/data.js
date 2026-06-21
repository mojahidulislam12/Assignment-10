import { serverFetch } from "../server";

export const getLawyer = async (query) => {
  const result = await serverFetch(`/api/lawyer?${query}`);
  return result;
};
