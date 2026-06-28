import { getAllApplicant } from "@/lib/api/user/data";
import { getUserSession } from "@/lib/core/user";
import { Card } from "@heroui/react";
import {
  FaUserTie,
  FaClock,
  FaCheckCircle,
  FaGavel,
  FaCrown,
} from "react-icons/fa";

const LawyerOverviewPage = async () => {
  const user = await getUserSession();
  // const applicants = await getAllUserApplicationByApplicantEmail(user.email);
  // console.log(applicant);
  const allApplications = await getAllApplicant();
  const applicant = allApplications.filter(
    (applicantion) => applicantion.email === user.email,
  );
  console.log(applicant);
  const isPremium = false;

  // Replace with real database queries later
  const stats = {
    totalRequests: 24,
    pendingRequests: 5,
    acceptedClients: 16,
    activeCases: 8,
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Total Requests
              </span>
              <h2 className="text-3xl font-extrabold mt-1">
                {applicant.length}
              </h2>
            </div>

            <div className="p-3.5 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
              <FaUserTie size={24} />
            </div>
          </div>
        </Card>

        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Pending Requests
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                {stats.pendingRequests}
              </h2>
            </div>

            <div className="p-3.5 bg-yellow-500/10 text-yellow-400 rounded-2xl border border-yellow-500/20">
              <FaClock size={24} />
            </div>
          </div>
        </Card>

        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Accepted Clients
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                {stats.acceptedClients}
              </h2>
            </div>

            <div className="p-3.5 bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20">
              <FaCheckCircle size={24} />
            </div>
          </div>
        </Card>

        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Active Cases
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                {stats.activeCases}
              </h2>
            </div>

            <div className="p-3.5 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20">
              <FaGavel size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Premium Section */}
      {isPremium ? (
        <Card
          className="border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-amber-600/5 to-transparent overflow-hidden"
          radius="lg"
        >
          <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaCrown className="text-yellow-400" />
                Become a Featured Lawyer
              </h3>

              <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                Upgrade to Premium and enjoy higher profile visibility, featured
                lawyer badge, priority placement in lawyer listings, and
                unlimited client hiring requests.
              </p>
            </div>
          </div>
        </Card>
      ) : (
        <Card
          className="border border-green-500/20 bg-gradient-to-r from-green-500/5 via-green-600/5 to-transparent overflow-hidden"
          radius="lg"
        >
          <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FaCrown className="text-green-400" />
                Premium Lawyer Dashboard
              </h3>

              <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                Your profile is featured across the platform. You receive
                priority visibility, unlimited hiring requests, and premium
                lawyer benefits.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Recent Activity */}
      {/* <Card className="glass border-white/5" radius="lg">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Hiring Requests</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-default-100 pb-3">
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-default-500">
                  Family Law Consultation
                </p>
              </div>

              <span className="text-sm text-yellow-500">Pending</span>
            </div>

            <div className="flex items-center justify-between border-b border-default-100 pb-3">
              <div>
                <p className="font-medium">Sarah Ahmed</p>
                <p className="text-sm text-default-500">Corporate Law Advice</p>
              </div>

              <span className="text-sm text-green-500">Accepted</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Michael Smith</p>
                <p className="text-sm text-default-500">
                  Property Dispute Case
                </p>
              </div>

              <span className="text-sm text-green-500">Accepted</span>
            </div>
          </div>
        </div>
      </Card> */}
    </div>
  );
};

export default LawyerOverviewPage;
