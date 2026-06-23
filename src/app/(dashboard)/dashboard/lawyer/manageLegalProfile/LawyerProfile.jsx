"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  TextArea,
  Label,
  Input,
  FieldError,
  Button,
  toast,
} from "@heroui/react";

import { ArrowUpToLine, Pencil } from "@gravity-ui/icons";
import { addProfile } from "@/lib/api/lawyer/action";

export default function LawyerProfile({ user, lawyer: data, initialLawyer }) {
  const [lawyer, setLawyer] = useState(data);

  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // WHITE INPUT STYLE
  const textInputClass =
    "w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-3 py-2.5 outline-none focus:border-gray-500";

  const textAreaClass =
    "w-full bg-white border border-gray-300 text-gray-900 rounded-lg p-3 outline-none resize-none";

  // IMAGE UPLOAD
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors((p) => ({ ...p, image: "Max 5MB allowed" }));
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (data.success) {
        setImageUrl(data.data.url);
        setLawyer((p) => ({ ...p, image: data.data.url }));
      } else {
        setErrors((p) => ({ ...p, image: "Upload failed" }));
      }
    } catch {
      setErrors((p) => ({ ...p, image: "Network error" }));
    } finally {
      setIsUploading(false);
    }
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const newLawyer = {
      name: form.get("name"),
      email: form.get("email"),
      lawyerId: user?.id,
      specialization: form.get("specialization"),
      bio: form.get("bio"),
      fee: Number(form.get("fee")),
      location: form.get("location"),
      experience: Number(form.get("experience")),
      image: imageUrl || lawyer.image,
      status: lawyer.status || "available",
      totalHires: lawyer.totalHires || 0,
      createdAt: lawyer.createdAt || new Date().toISOString(),
    };
    setLawyer(newLawyer);

    // ✅ VALIDATION FIRST
    const newErrors = {};
    if (!newLawyer.name) newErrors.name = "Name required";
    if (!newLawyer.email) newErrors.email = "Email required";
    if (!newLawyer.specialization)
      newErrors.specialization = "Specialization required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // ✅ API CALL AFTER VALIDATION
      const res = await addProfile(newLawyer);

      console.log("Saved Lawyer:", res);

      // update UI state
      setLawyer(newLawyer);
      setIsEditing(false);

      // toast success (safe usage)
      toast?.success?.("Lawyer profile saved successfully");
    } catch (error) {
      console.error(error);
      toast?.error?.("Failed to save profile");
    }
  };
  // VIEW MODE (WHITE CARD)
  if (!isEditing) {
    return (
      <div className="max-w-3xl mx-auto my-10 bg-white border border-gray-200 rounded-xl p-6 text-gray-900 shadow-sm">
        <div className="flex justify-between items-center border-b pb-4">
          <div className="flex items-center gap-4">
            {lawyer.image ? (
              <img
                src={lawyer.image}
                className="w-14 h-14 rounded-lg object-cover"
              />
            ) : (
              <div className="w-14 h-14 bg-gray-100 rounded-lg" />
            )}

            <div>
              <h1 className="text-xl font-bold">{lawyer.name}</h1>
              <p className="text-gray-500">{lawyer.specialization}</p>
            </div>
          </div>

          <Button onPress={() => setIsEditing(true)} variant="bordered">
            <Pencil size={14} /> Edit
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-700">
          <p>Email: {lawyer.email}</p>
          <p>Location: {lawyer.location}</p>
          <p>Fee: ${lawyer.fee}</p>
          <p>Experience: {lawyer.experience} years</p>
          <p>Total Hires: {lawyer.totalHires}</p>
          <p>Status: {lawyer.status}</p>
        </div>

        <p className="mt-4 text-gray-600">{lawyer.bio}</p>
      </div>
    );
  }

  // EDIT MODE (WHITE FORM)
  return (
    <div className="max-w-3xl mx-auto my-10 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <Form onSubmit={handleSubmit} className="space-y-6">
        <Fieldset className="space-y-4">
          <TextField name="name" isInvalid={!!errors.name}>
            <Label>Name</Label>
            <Input className={textInputClass} />
            <FieldError>{errors.name}</FieldError>
          </TextField>

          <TextField name="email" isInvalid={!!errors.email}>
            <Label>Email</Label>
            <Input className={textInputClass} />
            <FieldError>{errors.email}</FieldError>
          </TextField>

          <TextField name="specialization">
            <Label>Specialization</Label>
            <Input className={textInputClass} />
          </TextField>

          <div className="grid grid-cols-2 gap-4">
            <TextField name="location">
              <Label>Location</Label>
              <Input className={textInputClass} />
            </TextField>

            <TextField name="fee">
              <Label>Fee</Label>
              <Input className={textInputClass} />
            </TextField>
          </div>

          <TextField name="experience">
            <Label>Experience</Label>
            <Input className={textInputClass} />
          </TextField>

          <TextField name="bio">
            <Label>Bio</Label>
            <TextArea rows={4} className={textAreaClass} />
          </TextField>

          {/* IMAGE UPLOAD */}
          <div>
            <Label>Profile Image</Label>

            <label className="flex items-center gap-3 mt-2 cursor-pointer">
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />

              <div className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                <ArrowUpToLine className="text-gray-500" />
              </div>

              <span className="text-sm text-gray-500">
                {isUploading ? "Uploading..." : "Upload Image"}
              </span>
            </label>

            {errors.image && (
              <p className="text-red-500 text-xs mt-1">{errors.image}</p>
            )}
          </div>
        </Fieldset>

        <div className="flex justify-end">
          <Button type="submit" className="bg-black text-white">
            Save Lawyer Profile
          </Button>
        </div>
      </Form>
    </div>
  );
}
