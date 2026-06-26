import { getLawyers } from "@/lib/api/lawyer/data";
import { SingleLawyerProfile } from "@/lib/api/lawyer/lawyerdata";
import { getUserSession } from "@/lib/core/user";
import { redirect } from "next/navigation";
import React from "react";
import LawyerApply from "./LawyerApply";
import { getApplicationByApplicant } from "@/lib/api/user/data";
import Link from "next/link";

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

  const applications = await getApplicationByApplicant(user.id);
  // const plan = {
  //   name: "Free",
  //   maxApplicationPerMonth: 3,
  // };
  return (
    <div className="container mx-auto">
      {/* <h2 className="text-center">
        You have applied so far : {applications.length} out of 4
      </h2> */}
      {/* <p>
        Purchase plan to apply for more position{" "}
        <Link href={"/plans"}>Plans</Link>
      </p> */}
      {/* {applications.length < plan.maxApplicationPerMonth && (
        <LawyerApply lawyer={lawyer} applicant={user}></LawyerApply>
      )} */}
      <LawyerApply lawyer={lawyer} applicant={user}></LawyerApply>
    </div>
  );
};

export default ApplyPage;

// import { SingleLawyerProfile } from "@/lib/api/lawyer/lawyerdata";
// import { getUserSession } from "@/lib/core/user";
// import { redirect } from "next/navigation";
// import LawyerApply from "./LawyerApply";
// import { getApplicationByApplicant } from "@/lib/api/user/data";
// import Link from "next/link";
// import { ShieldExclamation, CircleInfo, Rocket } from "@gravity-ui/icons";

// const ApplyPage = async ({ params }) => {
//   const { id } = await params;

//   const user = await getUserSession();

//   if (!user) {
//     redirect(`/signin?redirect=/browseLawyer/${id}/apply`);
//   }

//   // Role Guard
//   if (user.role !== "client") {
//     return (
//       <div className="w-full min-h-[80vh] flex flex-col justify-center items-center text-white p-6">
//         <div className="max-w-md w-full text-center p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
//           <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
//             <ShieldExclamation className="w-6 h-6" />
//           </div>

//           <h3 className="text-xl font-bold text-zinc-100 mb-2">
//             Access Restricted
//           </h3>

//           <p className="text-zinc-400 text-sm leading-relaxed mb-6">
//             Only clients can hire lawyers. Please sign in with a client account
//             to continue.
//           </p>

//           <Link
//             href="/signin"
//             className="inline-block w-full px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition"
//           >
//             Sign In
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const lawyer = await SingleLawyerProfile(id);

//   const applications = await getApplicationByApplicant(user.id);

//   // Replace with database plan
//   const plan = {
//     name: "Free",
//     maxApplicationPerMonth: 3,
//   };

//   const applicationCount = applications?.length || 0;

//   const hasReachedLimit = applicationCount >= plan.maxApplicationPerMonth;

//   const usagePercentage = Math.min(
//     (applicationCount / plan.maxApplicationPerMonth) * 100,
//     100,
//   );

//   return (
//     <div className="w-full min-h-screen bg-zinc-950 text-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl mx-auto space-y-8">
//         {/* Usage Card */}
//         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
//             <div>
//               <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
//                 Monthly Hiring Quota
//               </span>

//               <h2 className="text-lg font-bold text-zinc-100 mt-1">
//                 You have hired{" "}
//                 <span className="text-blue-400">{applicationCount}</span> out of{" "}
//                 <span className="text-zinc-400">
//                   {plan.maxApplicationPerMonth}
//                 </span>{" "}
//                 lawyers this month
//               </h2>
//             </div>

//             <span className="self-start sm:self-center px-3 py-1 text-xs font-medium rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
//               Current Plan: <strong className="text-white">{plan.name}</strong>
//             </span>
//           </div>

//           {/* Progress */}
//           <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden mb-5">
//             <div
//               className={`h-full transition-all duration-500 rounded-full ${
//                 hasReachedLimit
//                   ? "bg-red-500"
//                   : usagePercentage > 66
//                     ? "bg-amber-500"
//                     : "bg-blue-500"
//               }`}
//               style={{
//                 width: `${usagePercentage}%`,
//               }}
//             />
//           </div>

//           {/* Upgrade Banner */}
//           <div className="flex items-start gap-3 bg-blue-950/30 border border-blue-900/50 rounded-xl p-4 text-sm text-blue-300/90">
//             <Rocket className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />

//             <div className="flex-1 sm:flex sm:items-center sm:justify-between gap-4">
//               <p>
//                 Need more lawyer hiring requests? Upgrade your plan to unlock
//                 higher monthly limits and premium features.
//               </p>

//               <Link
//                 href="/plans"
//                 className="inline-block mt-2 sm:mt-0 whitespace-nowrap text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-lg transition"
//               >
//                 View Plans
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Apply Section */}
//         {hasReachedLimit ? (
//           <div className="bg-zinc-900/50 border border-dashed border-zinc-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center">
//             <div className="w-10 h-10 bg-zinc-800 text-zinc-400 rounded-full flex items-center justify-center mb-3">
//               <CircleInfo className="w-5 h-5" />
//             </div>

//             <h4 className="text-base font-semibold text-zinc-200">
//               Monthly Limit Reached
//             </h4>

//             <p className="text-sm text-zinc-500 max-w-sm mt-1">
//               You have reached your lawyer hiring request limit for this month.
//               Upgrade your plan to continue immediately.
//             </p>

//             <Link
//               href="/plans"
//               className="mt-5 px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition"
//             >
//               Upgrade Plan
//             </Link>
//           </div>
//         ) : (
//           <div className="animate-in fade-in-50 duration-300">
//             <LawyerApply lawyer={lawyer} applicant={user} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ApplyPage;
