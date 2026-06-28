"use client";
import { baseUrl } from "@/lib/api/baseUrl";
import { addProfile, updateProfile } from "@/lib/api/lawyer/action";
import { getAllLawyers } from "@/lib/api/lawyer/data";
//import { LawyerProfile } from "@/lib/api/lawyer/lawyerdata";
import { authClient, useSession } from "@/lib/auth-client";

import { uploadImage } from "@/utils/uploadImage";
import { Button, Card, CardHeader, Form, Input, TextArea } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LawyerProfile = () => {
  const { data: session } = authClient.useSession();
  const [profile, setProfile] = useState(null);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      image: "",
      specialization: "",
      status: "",
      location: "",
      experience: "",
      totalHires: "",
      fee: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (!session?.user?.email) return;

    const loadData = async () => {
      const res = await fetch("http://localhost:5000/api/lawyer");
      const lawyers = await res.json();

      const lawyer = lawyers.find((item) => item.email === session.user.email);

      setProfile(lawyer);

      if (lawyer) {
        reset({
          name: lawyer.name || "",
          email: lawyer.email || "",
          specialization: lawyer.specialization || "",
          status: lawyer.status || "available",
          location: lawyer.location || "",
          experience: lawyer.experience || "",
          totalHires: lawyer.totalHires || "",
          fee: lawyer.fee || "",
          bio: lawyer.bio || "",
        });
      }
    };

    loadData();
  }, [session, reset]);

  const onSubmit = async (data) => {
    const imageFile = data.image[0];
    const imageUrl = await uploadImage(imageFile);

    const lawyerData = {
      name: data.name,
      // email: data.email,

      email: session.user.email,
      image: imageUrl,
      specialization: data.specialization,
      status: data.status,
      location: data.location,
      experience: data.experience,
      totalHires: data.totalHires,
      fee: data.fee,
      bio: data.bio,
    };
    if (!profile) {
      const res = await addProfile(lawyerData);
      if (res) {
        toast.success("Profile Created");
      }
    } else {
      const updateRes = await updateProfile(lawyerData, profile._id);
      if (updateRes.modifiedCount > 0) {
        toast.success("Profile Updated Successfully");
        window.location.reload();
      }
    }

    console.log(res);
  };
  return (
    <div className="border-b border-white/5 pb-5 container ">
      <div className="mt-6 space-y-6 max-w-4xl mx-auto">
        <Card
          className=" border border-white/5 bg-white backdrop-blur-xl shadow-2xl rounded-2xl"
          radius="lg"
        >
          {profile ? (
            <h1 className="text-3xl font-extrabold text-center">
              Update Your Profile
            </h1>
          ) : (
            <h1 className="text-3xl font-extrabold text-center">
              Create Your Profile
            </h1>
          )}
          <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
            <h3 className="text-xl font-bold text-black">Profile Details</h3>
            <p className="text-slate-400 text-xs">
              Review and edit your organization credentials.
            </p>
          </CardHeader>
          <div className="p-6">
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <label htmlFor="">Name</label>
              <Input
                defaultValue={profile?.name}
                {...register("name", { required: "Name is required" })}
                id="name"
                label="Organization Name"
                labelPlacement="outside"
                placeholder=""
                required
                className="w-full bg-white border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
              />

              <label htmlFor="">ImageUrl</label>
              <Input
                defaultValue={profile?.image}
                {...register("image", { required: "Name is required" })}
                id="image"
                type="file"
                accept="image/*"
                label="Organization Logo"
                labelPlacement="outside"
                placeholder=""
                required
                className="w-full bg-white border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
              />

              <div className="space-y-2">
                <label
                  htmlFor="specialization"
                  className="block text-sm font-medium text-gray-700"
                >
                  Specialization
                </label>

                <select
                  defaultValue={profile?.specialization}
                  id="specialization"
                  {...register("specialization")}
                  className="w-full px-5 py-3 bg-white border border-gray-300 rounded-full text-gray-700 shadow-sm outline-none transition-all duration-200 cursor-pointer hover:border-pink-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                >
                  <option value="">Select Specialization</option>
                  <option value="Criminal Law">Criminal Law</option>
                  <option value="Corporate Law">Corporate Law</option>
                  <option value="Family Law">Family Law</option>
                  <option value="Civil Law">Civil Law</option>
                  <option value="Property Law">Property Law</option>
                  <option value="Immigration Law">Immigration Law</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>

                <select
                  id="status"
                  {...register("status")}
                  className="w-full px-5 py-3 bg-white border border-gray-300 rounded-full text-gray-700 shadow-sm outline-none transition-all duration-200 cursor-pointer hover:border-pink-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="unavailable">available</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>

                <select
                  defaultValue={profile?.location}
                  id="location"
                  {...register("location")}
                  className="w-full px-5 py-3 bg-white border border-gray-300 rounded-full text-gray-700 shadow-sm outline-none transition-all duration-200 cursor-pointer hover:border-pink-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                >
                  <option value="">Select Location</option>
                  <option value="dhaka">Dhaka</option>
                  <option value="cumilla">Cumilla</option>
                  <option value="chattogram">Chattogram</option>
                  <option value="sylhet">Sylhet</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium text-gray-700"
                >
                  Experience (Years)
                </label>

                <select
                  defaultValue={profile?.experience}
                  id="experience"
                  {...register("experience")}
                  className="w-full px-5 py-3 bg-white border border-gray-300 rounded-full text-gray-700 shadow-sm outline-none transition-all duration-200 hover:border-pink-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                >
                  <option value="">Select Experience</option>
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3 Years</option>
                  <option value="5">5 Years</option>
                  <option value="10">10+ Years</option>
                  <option value="15">15+ Years</option>
                </select>
              </div>
              <label htmlFor="">TotalHires</label>
              <Input
                defaultValue={profile?.totalHires}
                {...register("totalHires", { required: "Name is required" })}
                id="totalHires"
                label="Organization Website"
                labelPlacement="outside"
                placeholder="techevents.corp"
                required
                className="w-full bg-white border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
              />
              <label htmlFor="">Fee</label>

              <Input
                defaultValue={profile?.fee}
                {...register("fee", { required: "Name is required" })}
                id="fee"
                label="Organization Website"
                labelPlacement="outside"
                placeholder="techevents.corp"
                required
                className="w-full bg-white border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
              />

              <label htmlFor="">Bio</label>

              <TextArea
                defaultValue={profile?.bio}
                {...register("bio", { required: "image is Required" })}
                type="file"
                id="bio"
                label="Description"
                labelPlacement="outside"
                placeholder="Hosting global developer conferences and software hacking marathons."
                required
                className="w-full bg-white border border-white/10 rounded-xl focus:outline-none min-h-[100px] text-black text-sm"
              />

              <div className="flex gap-4 text-center">
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 px-6 shadow-lg "
                  radius="lg"
                >
                  {profile ? "UPDATE" : "Save Changes"}
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LawyerProfile;
