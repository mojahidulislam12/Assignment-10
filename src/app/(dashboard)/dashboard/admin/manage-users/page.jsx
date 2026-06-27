import { getAllUsers } from "@/lib/api/user/data";
import React from "react";

import Link from "next/link";
import DeleteModal from "@/Components/HomePage/DeleteModal";

const manageUsersPage = async () => {
  const allUser = await getAllUsers();

  console.log(allUser);
  return (
    <div>
      <div>
        <div className="container mx-auto rounded-xl ">
          <table className="container text-sm">
            <thead className=" text-black">
              <tr>
                <th className=" text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-center">Change Role</th>
                <th className="px-4 py-3 text-center">Delete</th>
              </tr>
            </thead>

            <tbody>
              {allUser.map((user) => (
                <tr
                  key={user._id}
                  className="border-t border-zinc-800 hover:bg-zinc-800/40"
                >
                  <td className="px-4 py-4">{user.name}</td>

                  <td className="px-4 py-4">{user.email}</td>

                  <td className="px-4 py-4 capitalize">{user.role}</td>

                  <td className="px-4 py-4 text-center">
                    <button className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
                      Change Role
                    </button>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <DeleteModal data={user?._id}></DeleteModal>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default manageUsersPage;
