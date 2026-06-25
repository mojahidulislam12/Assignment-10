import { serverMutation } from "../server";

export const updateUserProfile = async (data, id) => {
  const resData = await serverMutation(`/api/lawyer/${id}`, "PATCH", data);
  console.log(resData);
  return resData;
};
