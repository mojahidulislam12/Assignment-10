"use client";
import { addProfile, updateProfile } from "@/lib/api/lawyer/action";
import { LawyerProfile } from "@/lib/api/lawyer/lawyerdata";
import { useSession } from "@/lib/auth-client";

import { uploadImage } from "@/utils/uploadImage";
import { Button, Card, CardHeader, Form, Input, TextArea } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Lawyer = () => {
  const { data: session } = useSession();
  const [myProfile, setMyProfile] = useState(null);
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
    const setProfileData = async () => {
      const profile = await LawyerProfile(session.user.email);
      setMyProfile(profile);
      if (profile) {
        reset({
          name: profile.name || "",
          email: profile.email || "",

          specialization: profile.specialization || "",
          status: profile.status || "",
          location: profile.location || "",
          experience: profile.experience?.toString() || "",
          totalHires: profile.totalHires || "",
          fee: profile.fee || "",
          bio: profile.bio || "",
        });
      }
    };
    setProfileData();
  }, [session, reset]);

  console.log(myProfile);

  const onSubmit = async (data) => {
    // Upload image to imgbb
    console.log(data);

    const imageFile = data.image[0];
    const imageUrl = await uploadImage(imageFile);

    const lawyerData = {
      name: data.name,
      // email: data.email,
      Id: session.user.id,
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
    if (!myProfile) {
      const resData = await addProfile(lawyerData);
      if (resData.insertedId) {
        toast.success("Profile Successfully Created");
        window.location.reload();
      }
    } else {
      const updateRes = await updateProfile(lawyerData, myProfile._id);
      if (updateRes.modifiedCount > 0) {
        toast.success("Profile Updated Successfully");
        window.location.reload();
      }
    }
  };
  return (
    <div className="border-b border-white/5 pb-5">
      {myProfile ? (
        <h1 className="text-3xl font-extrabold">Update Your Profile</h1>
      ) : (
        <h1 className="text-3xl font-extrabold">Create Your Profile</h1>
      )}

      <div className="mt-6 space-y-6 max-w-3xl">
        <Card
          className="border border-white/5 bg-white backdrop-blur-xl shadow-2xl rounded-2xl"
          radius="lg"
        >
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
                defaultValue={myProfile?.name}
                {...register("name", { required: "Name is required" })}
                id="name"
                label="Organization Name"
                labelPlacement="outside"
                placeholder=""
                required
                className="w-full bg-white border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
              />
              {/* <label htmlFor="">Email</label>
              <Input
                defaultValue={myProfile?.email}
                {...register("email", { required: "Name is required" })}
                id="email"
                label="Organization Website"
                labelPlacement="outside"
                placeholder={session?.user?.email}
                required
                className="w-full bg-white border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
              /> */}
              <label htmlFor="">ImageUrl</label>
              <Input
                defaultValue={myProfile?.image}
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
                  defaultValue={myProfile?.specialization}
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
                  defaultValue={myProfile?.status}
                  id="status"
                  {...register("status")}
                  className="w-full px-5 py-3 bg-white border border-gray-300 rounded-full text-gray-700 shadow-sm outline-none transition-all duration-200 cursor-pointer hover:border-pink-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="unavailable">Unavailable</option>
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
                  defaultValue={myProfile?.location}
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
                  defaultValue={myProfile?.experience}
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
                defaultValue={myProfile?.totalHires}
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
                defaultValue={myProfile?.fee}
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
                defaultValue={myProfile?.bio}
                {...register("bio", { required: "image is Required" })}
                type="file"
                id="bio"
                label="Description"
                labelPlacement="outside"
                placeholder="Hosting global developer conferences and software hacking marathons."
                required
                className="w-full bg-white border border-white/10 rounded-xl focus:outline-none min-h-[100px] text-black text-sm"
              />

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold h-11 px-6 shadow-lg"
                  radius="lg"
                >
                  {myProfile ? "Update Now" : "Save Changes"}
                </Button>
              </div>
            </Form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Lawyer;
