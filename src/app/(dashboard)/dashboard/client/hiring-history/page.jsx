import {
  getAllUserApplicationByApplicant,
  getApplicationByApplicant,
} from "@/lib/api/user/data";
import { getUserSession } from "@/lib/core/user";
import ApplicationsTable from "./ApplicationsTable";

const ApplicationsPage = async () => {
  const user = await getUserSession();
  const applicant = await getAllUserApplicationByApplicant(user.id);
  console.log(user, applicant);
  return (
    <div>
      <ApplicationsTable applicant={applicant}></ApplicationsTable>
    </div>
  );
};

export default ApplicationsPage;
