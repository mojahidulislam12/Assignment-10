"use server";

import { revalidatePath } from "next/cache";
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
export const UpdateApplication = async (id, data) => {
  const resData = await serverMutation(`/api/application/${id}`, "PATCH", data);
  revalidatePath("/dashboard/lawyer/hiring-history");
  return resData;
};
