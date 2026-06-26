// import React from "react";

// const LawyerApply = ({ lawyer, applicant }) => {
//   console.log(applicant, lawyer);
//   return (
//     <div>
//       <button>Apply Now</button>
//     </div>
//   );
// };

// export default LawyerApply;

"use client";

import React, { useState } from "react";
import { Button, Input, TextArea } from "@heroui/react";
import { createApplication } from "@/lib/api/lawyer/action";
import toast from "react-hot-toast";

const LawyerApply = ({ lawyer, applicant }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    caseDescription: "",
    meetingDate: "",
    phone: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const hireData = {
        lawyerId: lawyer?._id,
        lawyerName: lawyer?.name,
        caseType: lawyer?.specialization,
        consultationFee: lawyer?.fee,
        clientId: applicant?.id,
        clientName: applicant?.name,
        clientEmail: applicant?.email,

        ...formData,

        status: "pending",
        createdAt: new Date(),
      };

      console.log(hireData);

      const res = await createApplication(hireData);
      if (res.insertedId) {
        toast.success("Hire request submitted!");
      }

      setFormData({
        caseDescription: "",
        meetingDate: "",
        phone: "",
        notes: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto rounded-2xl border p-6 bg-white">
      {" "}
      <div className="mb-6">
        {" "}
        <h2 className="text-2xl font-bold">Hire Lawyer</h2>
        <p className="text-default-500 mt-1">
          Submit your legal case details to hire this lawyer.
        </p>
      </div>
      <div className="mb-6 rounded-xl border p-4 bg-default-50">
        <h3 className="font-semibold text-lg">{lawyer?.name}</h3>

        <p className="text-default-500">{lawyer?.specialization}</p>

        <p className="font-medium mt-2">Consultation Fee:Tk{lawyer?.fee}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex flex-col space-y-5">
          <Input
            className="mt-3"
            label="Client Name"
            value={applicant?.name || ""}
            isReadOnly
          />

          <Input
            className="mt-3"
            label="Client Email"
            value={applicant?.email || ""}
            isReadOnly
          />

          <Input
            className="mt-3"
            label="Case Type"
            value={lawyer?.specialization || ""}
            isReadOnly
          />
          <TextArea
            className="mt-3"
            label="Case Description"
            name="caseDescription"
            placeholder="Describe your legal issue..."
            value={formData.caseDescription}
            onChange={handleChange}
            minRows={5}
            isRequired
          />

          <Input
            className="mt-3"
            type="date"
            label="Preferred Meeting Date"
            name="meetingDate"
            value={formData.meetingDate}
            onChange={handleChange}
            isRequired
          />

          <Input
            className="mt-3"
            type="tel"
            label="Phone Number"
            name="phone"
            placeholder="+8801XXXXXXXXX"
            value={formData.phone}
            onChange={handleChange}
            isRequired
          />

          <TextArea
            className="mt-3"
            label="Additional Notes"
            name="notes"
            placeholder="Any special instructions..."
            value={formData.notes}
            onChange={handleChange}
            minRows={3}
          />
        </div>

        <Button
          type="submit"
          color="primary"
          isLoading={loading}
          className="w-full"
        >
          Send Hire Request
        </Button>
      </form>
    </div>
  );
};

export default LawyerApply;
