import { getAllLawyers } from "@/lib/api/lawyer/data";
import { getAllApplicant, getAllUsers } from "@/lib/api/user/data";
import { Card } from "@heroui/react";
import {
  FaUsers,
  FaUserTie,
  FaClipboardList,
  FaCheckCircle,
  FaCrown,
} from "react-icons/fa";

const AdminOverviewPage = async () => {
  const allUser = await getAllUsers();
  const allLawyer = await getAllLawyers();
  const allHireRequest = await getAllApplicant();
  // Fetch these values from your database later
  const stats = {
    totalUsers: 1240,
    totalLawyers: 215,
    totalHireRequests: 487,
    approvedLawyers: 180,
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="glass border-white/5">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-slate-400 font-semibold">
                Total Users
              </p>
              <h2 className="text-3xl font-bold mt-2">{allUser.length}</h2>
            </div>

            <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-500">
              <FaUsers size={24} />
            </div>
          </div>
        </Card>

        <Card className="glass border-white/5">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-slate-400 font-semibold">
                Total Lawyers
              </p>
              <h2 className="text-3xl font-bold mt-2">{allLawyer.length}</h2>
            </div>

            <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-500">
              <FaUserTie size={24} />
            </div>
          </div>
        </Card>

        <Card className="glass border-white/5">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-slate-400 font-semibold">
                Hire Requests
              </p>
              <h2 className="text-3xl font-bold mt-2">
                {allHireRequest.length}
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-yellow-500/10 text-yellow-500">
              <FaClipboardList size={24} />
            </div>
          </div>
        </Card>
        <Card className="glass border-white/5">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase text-slate-400 font-semibold">
                Approved Lawyers
              </p>
              <h2 className="text-3xl font-bold mt-2"></h2>
            </div>

            <div className="p-4 rounded-2xl bg-green-500/10 text-green-500">
              <FaCheckCircle size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Admin Information */}
      <Card className="border border-red-500/20 bg-gradient-to-r from-red-500/5 via-red-600/5 to-transparent">
        <div className="p-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FaCrown className="text-red-500" />
              Administrator Dashboard
            </h2>

            <p className="text-slate-400 mt-3 max-w-2xl">
              Manage lawyers, users, hire requests, premium memberships,
              payments, and monitor overall platform activity from one place.
            </p>
          </div>
        </div>
      </Card>

      {/* Recent Activities */}
      <Card className="glass border-white/5">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-5">
            Recent Platform Activities
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between border-b border-default-100 pb-3">
              <div>
                <p className="font-medium">New lawyer registration</p>
                <span className="text-sm text-default-500">
                  Rahim Uddin submitted verification.
                </span>
              </div>

              <span className="text-warning text-sm">Pending</span>
            </div>

            <div className="flex justify-between border-b border-default-100 pb-3">
              <div>
                <p className="font-medium">Premium subscription</p>
                <span className="text-sm text-default-500">
                  Hasan Mahmud upgraded to Premium.
                </span>
              </div>

              <span className="text-success text-sm">Completed</span>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="font-medium">Hire request accepted</p>
                <span className="text-sm text-default-500">
                  Client hired Advocate Jannat.
                </span>
              </div>

              <span className="text-success text-sm">Accepted</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminOverviewPage;
