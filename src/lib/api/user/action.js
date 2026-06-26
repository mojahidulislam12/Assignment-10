import { baseUrl } from "../baseUrl";
import { serverMutation } from "../server";

export const updateUserProfile = async (data, id) => {
  const resData = await serverMutation(`/api/lawyer/${id}`, "PATCH", data);
  console.log(resData);
  return resData;
};
export const deleteUser = async (id) => {
  const res = await fetch(`${baseUrl}/api/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};
