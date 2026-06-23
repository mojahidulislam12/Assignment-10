import React from "react";
import { getUserSession } from "../../../../../lib/core/user";
import LawyerProfile from "./LawyerProfile";
import { getLawyers } from "@/lib/api/lawyer/data";

const page = async () => {
  const user = await getUserSession();
  const lawyer = await getLawyers(user?.id);
  return (
    <div>
      <LawyerProfile user={user} lawyer={lawyer}></LawyerProfile>
    </div>
  );
};

export default page;
