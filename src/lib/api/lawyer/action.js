"use server";

import { serverMutation } from "../server";

export const addProfile = async (data) => {
  const resData = await serverMutation("/api/lawyer", "POST", data);
  return resData;
};

export const updateProfile = async (data, id) => {
  const resData = await serverMutation(`/api/lawyer/${id}`, "PATCH", data);
  return resData;
};

export const createApplication = async (data) => {
  const resData = await serverMutation("/api/application", "POST", data);
  return resData;
};
