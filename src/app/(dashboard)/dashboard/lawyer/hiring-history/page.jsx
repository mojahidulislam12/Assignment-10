import ApplicantTable from "@/Components/Lawyer/ApplicantTable";

import {
  getAllApplicant,
  getAllUserApplicationByApplicant,
  getAllUserApplicationByApplicantEmail,
  getApplicationByApplicant,
} from "@/lib/api/user/data";
import { getUserSession } from "@/lib/core/user";
import React from "react";

const HiringHistoryPage = async () => {
  const user = await getUserSession();
  // const applicants = await getAllUserApplicationByApplicantEmail(user.email);
  // console.log(applicant);
  const allApplications = await getAllApplicant();
  const applicant = allApplications.filter(
    (applicantion) => applicantion.email === user.email,
  );
  console.log(applicant);
  return (
    <div className="w-full">
      <ApplicantTable applicant={applicant}></ApplicantTable>
    </div>
  );
};

export default HiringHistoryPage;
