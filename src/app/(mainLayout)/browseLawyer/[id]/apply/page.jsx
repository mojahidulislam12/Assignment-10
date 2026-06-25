import { getLawyers } from "@/lib/api/lawyer/data";
import { SingleLawyerProfile } from "@/lib/api/lawyer/lawyerdata";
import { getUserSession } from "@/lib/core/user";
import { redirect } from "next/navigation";
import React from "react";
import LawyerApply from "./LawyerApply";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) {
    redirect(`/signin?redirect=/browseLawyer/${id}/apply`);
  }
  if (user.role !== "client") {
    return (
      <div className="w-full min-h-screen bg-zinc-950 flex flex-col justify-center items-center p-6">
        <p className="text-zinc-400 text-lg">
          Only User can apply for position. Please sign in with a user account
          to proceed
        </p>
      </div>
    );
  }
  const lawyer = await SingleLawyerProfile(id);
  console.log(lawyer);
  return (
    <div>
      <LawyerApply lawyer={lawyer} applicant={user}></LawyerApply>
    </div>
  );
};

export default ApplyPage;
