"use server";

import { serverMutation } from "../server";

export const addProfile = async (data) => {
  const resData = await serverMutation("/api/lawyer", "POST", data);
  return resData;
};
