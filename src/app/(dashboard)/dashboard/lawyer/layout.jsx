import { requireRole } from "@/lib/core/user";
import React from "react";

const LayerLayout = async ({ children }) => {
  await requireRole("lawyer");
  return children;
};

export default LayerLayout;
