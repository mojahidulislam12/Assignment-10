import React from "react";
import LegalCategoriesCard from "./LegalCategoriesCard";
import { getLawyer } from "@/lib/api/lawyer/data";

const LegalCategories = async () => {
  const lawyers = await getLawyer();
  return (
    <div>
      <LegalCategoriesCard lawyers={lawyers}></LegalCategoriesCard>
    </div>
  );
};

export default LegalCategories;
