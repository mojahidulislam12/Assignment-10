import { serverFetch } from "../server";

export const LawyerProfile = async (email) => {
  const result = await serverFetch(`/api/lawyer/${email}`);
  console.log(result, "profile");
  return result;
};
