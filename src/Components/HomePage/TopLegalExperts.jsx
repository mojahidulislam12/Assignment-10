import React from "react";
import LegalCard from "./LegalCard";
import { getLawyer } from "@/lib/api/lawyer/data";

const TopLegalExperts = async () => {
  const lawyers = await getLawyer();
  return (
    <div>
      <div>
        <LegalCard lawyers={lawyers}></LegalCard>
      </div>
    </div>
  );
};

export default TopLegalExperts;
