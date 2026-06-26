"use client";

import { deleteUser, DeleteUserProfile } from "@/lib/api/user/action";
import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";

const DeleteModal = ({ data }) => {
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/api/user/${data}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data1 = await res.json();
    console.log(data1);
    if (data1) {
      toast.error("Delete Successfully");
      window.location.reload();
    }
  };
  return (
    <div>
      <AlertDialog>
        <Button variant="danger">Delete Project</Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-[400px]">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>
                  Delete project permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p>
                  This will permanently delete{" "}
                  <strong>My Awesome Project</strong> and all of its data. This
                  action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>
                <Button onClick={handleDelete} slot="close" variant="danger">
                  Delete Project
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DeleteModal;
