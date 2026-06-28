"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, Spinner } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import { getAllUsers, getUsers } from "@/lib/api/user/data";
import { EditModal } from "@/Components/client/EditModal";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  console.log(session);
  const user = session?.user;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card className="p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-6">
          <Image
            src={user?.image || "/default-avatar.png"}
            width={70}
            height={70}
            alt={user?.name}
            className="rounded-full object-cover w-70 h-70"
          />

          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{user?.name}</h1>

            <p>
              <strong>Email:</strong> {user?.email}
            </p>

            <p>
              <strong>Role:</strong> {user?.role}
            </p>

            <p>
              <strong>Phone:</strong> {user?.phone || "Not Provided"}
            </p>

            <p>
              <strong>Address:</strong> {user?.address || "Not Provided"}
            </p>

            <p>
              <strong>Joined:</strong>{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "N/A"}
            </p>

            <div className="flex gap-3 mt-5">
              <EditModal user={user} />

              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
