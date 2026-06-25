"use client";

import { updateUserProfile } from "@/lib/api/user/action";
import { uploadImage } from "@/utils/uploadImage";
import { Envelope } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function EditModal({ user }) {
  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      let imageUrl = user?.image;

      if (data.image?.[0]) {
        imageUrl = await uploadImage(data.image[0]);
      }

      const updatedData = {
        name: data.name,
        email: data.email,
        image: imageUrl,
      };

      const result = await updateUserProfile(updatedData, user?._id);

      if (result?.modifiedCount > 0) {
        toast.success("Profile updated successfully");
        window.location.reload();
      } else {
        toast.error("No changes were made");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <Modal>
      <Modal.Trigger>
        <Button color="primary">Update Profile</Button>
      </Modal.Trigger>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon>

              <Modal.Heading>Edit Profile</Modal.Heading>

              <p className="text-sm text-muted">
                Update your profile information.
              </p>
            </Modal.Header>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Body className="p-6">
                <Surface className="p-4">
                  <div className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input
                        {...register("name", {
                          required: "Name is required",
                        })}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p className="text-danger text-sm mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Input
                        {...register("email", {
                          required: "Email is required",
                        })}
                        type="email"
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-danger text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label>Profile Image</Label>
                      <Input
                        {...register("image")}
                        type="file"
                        accept="image/*"
                      />
                    </div>
                  </div>
                </Surface>
              </Modal.Body>

              <Modal.Footer>
                <Button type="button" slot="close" variant="secondary">
                  Cancel
                </Button>

                <Button type="submit" isLoading={isSubmitting}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
