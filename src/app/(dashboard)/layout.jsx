import { DashboardSidebar } from "@/Components/Dashboard/DashboardSidebar";
import NavBar from "@/Components/Share/NavBar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <NavBar></NavBar>
      <div className="flex min-h-screen container mx-auto">
        <DashboardSidebar></DashboardSidebar>
        <div className="px-6 py-10 container w-full mx-auto">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
