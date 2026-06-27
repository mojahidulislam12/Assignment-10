import React from "react";
import LawyerCard from "./LawyerCard";
import { getLawyer } from "@/lib/api/lawyer/data";

const FeaturedLawyers = async () => {
  const lawyers = await getLawyer();
  console.log(lawyers);

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mt-4 text-gray-900">
          Meet Our Expert Lawyers
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mt-3">
          Connect with experienced and verified legal professionals who are
          ready to help you with your legal needs.
        </p>

        <p className="mt-4 text-lg font-semibold text-primary">
          Total Lawyers: {lawyers.length}
        </p>
      </div>
      <div className="px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 container mx-auto">
        {lawyers.slice(0, 6).map((lawyer) => (
          <LawyerCard key={lawyer._id} lawyer={lawyer} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedLawyers;
