import Link from "next/link";
import { Button, Card } from "@heroui/react";
import {
  FaUserTie,
  FaClock,
  FaCheckCircle,
  FaCommentDots,
  FaCrown,
} from "react-icons/fa";
import { getUserSession } from "@/lib/core/user";
import { getAllUserApplicationByApplicant } from "@/lib/api/user/data";

const ClientOverviewPage = async () => {
  const user = await getUserSession();
  const applicant = await getAllUserApplicationByApplicant(user.id);
  const isPremium = false;

  const stats = {
    totalHires: 24,
    pendingRequests: 5,
    acceptedRequests: 16,
    totalComments: 8,
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="glass border-white/5" radius="lg">
          <div className="p-6 flex items-center justify-between">
            <div>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                Total Hires
              </span>
              <h2 className="text-3xl font-extrabold  mt-1">
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
                Accepted Requests
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                {stats.acceptedRequests}
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
                My Comments
              </span>
              <h2 className="text-3xl font-extrabold text-white mt-1">
                {stats.totalComments}
              </h2>
            </div>

            <div className="p-3.5 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20">
              <FaCommentDots size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Premium Section */}

      <Card
        className="border border-yellow-500/20 bg-gradient-to-r from-yellow-500/5 via-amber-600/5 to-transparent"
        radius="lg"
      >
        <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaCrown className="text-yellow-400" />
              Upgrade to Premium
            </h3>

            <p className="text-slate-400 text-sm mt-2">
              Enjoy priority support, faster responses, and exclusive access to
              premium lawyers and features.
            </p>
          </div>

          <Button color="warning" radius="full">
            Upgrade Now
          </Button>
        </div>
      </Card>

      {/* Quick Actions */}
    </div>
  );
};

export default ClientOverviewPage;
