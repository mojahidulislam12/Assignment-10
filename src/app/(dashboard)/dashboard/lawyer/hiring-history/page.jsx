import ApplicantTable from "@/Components/Lawyer/ApplicantTable";

import { getApplicationByApplicant } from "@/lib/api/user/data";
import { getUserSession } from "@/lib/core/user";
import React from "react";

const HiringHistoryPage = async () => {
  const user = await getUserSession();
  const applicant = await getApplicationByApplicant(user.id);

  return (
    <div>
      <ApplicantTable applicant={applicant}></ApplicantTable>
    </div>
  );
};

export default HiringHistoryPage;
