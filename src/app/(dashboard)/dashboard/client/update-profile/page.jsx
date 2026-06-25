"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, Avatar, Spinner } from "@heroui/react";
import { useSession } from "@/lib/auth-client";
import { getUsers } from "@/lib/api/user/data";
import Image from "next/image";
import { EditModal } from "@/Components/client/EditModal";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!session?.user?.id) return;

        const data = await getUsers(session.user.id);

        if (data) {
          setUser(data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    if (!isPending) {
      fetchUser();
    }
  }, [session, isPending]);

  if (isPending || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-danger">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <Image
            src={user?.image || ""}
            width={100}
            height={100}
            alt=""
            className="w-28 h-28 text-large"
            name={user?.name}
          />

          <div className="flex-1 space-y-3">
            <h1 className="text-3xl font-bold">{user?.name || "No Name"}</h1>

            <p className="text-default-500">{user?.email || "No Email"}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <p className="text-sm text-default-500">Role</p>
                <p className="font-medium">{user?.role || "User"}</p>
              </div>

              <div>
                <p className="text-sm text-default-500">Phone</p>
                <p className="font-medium">{user?.phone || "Not Provided"}</p>
              </div>

              <div>
                <p className="text-sm text-default-500">Address</p>
                <p className="font-medium">{user?.address || "Not Provided"}</p>
              </div>

              <div>
                <p className="text-sm text-default-500">Joined</p>
                <p className="font-medium">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
                <div>
                  <EditModal user={user}></EditModal>
                  <button className="btn btn-danger">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
