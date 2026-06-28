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
      {!isPremium ? (
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
                Enjoy priority support, faster responses, and exclusive access
                to premium lawyers and features.
              </p>
            </div>

            <Button color="warning" radius="full">
              Upgrade Now
            </Button>
          </div>
        </Card>
      ) : (
        <Card
          className="border border-green-500/20 bg-gradient-to-r from-green-500/5 via-green-600/5 to-transparent"
          radius="lg"
        >
          <div className="p-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaCrown className="text-green-400" />
              Premium Membership Active
            </h3>

            <p className="text-slate-400 text-sm mt-2">
              You are enjoying premium benefits and priority access to top-rated
              lawyers.
            </p>
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <Card className="glass border-white/5" radius="lg">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>

          <div className="flex flex-wrap gap-4">
            <Link href="/lawyers">
              <Button color="primary" radius="full">
                Find Lawyers
              </Button>
            </Link>

            <Link href="/dashboard/user/hiring-history">
              <Button color="secondary" radius="full">
                Hiring History
              </Button>
            </Link>

            <Link href="/dashboard/user/comments">
              <Button color="success" radius="full">
                My Comments
              </Button>
            </Link>

            <Link href="/dashboard/user/update-profile">
              <Button color="warning" radius="full">
                Update Profile
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="glass border-white/5" radius="lg">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-6">
            Recent Hiring Requests
          </h3>

          <div className="space-y-4">
            {[
              {
                lawyer: "John Doe",
                specialization: "Family Law",
                status: "Pending",
                color: "text-yellow-400",
              },
              {
                lawyer: "Sarah Ahmed",
                specialization: "Corporate Law",
                status: "Accepted",
                color: "text-green-400",
              },
              {
                lawyer: "Michael Smith",
                specialization: "Property Law",
                status: "Rejected",
                color: "text-red-400",
              },
            ].map((item) => (
              <div
                key={item.lawyer}
                className="flex items-center justify-between border-b border-default-100 pb-4"
              >
                <div>
                  <p className="font-medium text-white">{item.lawyer}</p>
                  <p className="text-sm text-default-500">
                    {item.specialization}
                  </p>
                </div>

                <span className={`text-sm font-medium ${item.color}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ClientOverviewPage;
