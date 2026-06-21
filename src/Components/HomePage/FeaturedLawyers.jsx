import React from "react";
import LawyerCard from "./LawyerCard";
import { getLawyer } from "@/lib/api/lawyer/data";

const FeaturedLawyers = async () => {
  const lawyers = await getLawyer();
  console.log(lawyers);

  return (
    <div>
      <h1>Total Lawyers : {lawyers.length}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 container mx-auto">
        {lawyers.slice(0, 6).map((lawyer) => (
          <LawyerCard key={lawyer._id} lawyer={lawyer} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedLawyers;
