import { Suspense } from "react";
import { Card } from "@heroui/react";

//import { getUser } from "@/lib/session/userSession";
import LawyerCard from "@/Components/HomePage/LawyerCard";
import FilterPanel from "@/Components/Lawyer/FilterPanel";
import { getLawyer } from "@/lib/api/lawyer/data";

// ?search=mern&category=music
export default async function BrowseEventsPage({ searchParams }) {
  const sParams = await searchParams;
  console.log(sParams);
  const search = sParams.search || "";
  const specialization = sParams.specialization || "";
  const location = sParams.location || "";
  // console.log(search, category, location);
  const params = new URLSearchParams();
  if (search) {
    params.set("search", search);
  }
  if (specialization) {
    params.set("specialization", specialization);
  }
  if (location) {
    params.set("location", location);
  }
  // console.log(params.toString());

  const lawyers = await getLawyer(params);

  return (
    <div className="min-h-screen py-16 px-6 max-w-7xl mx-auto w-full space-y-12">
      {/* HEADER */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          Browse Premium Events
        </h1>
        <p className="text-slate-400 text-sm max-w-xl">
          Search, filter, and discover state-of-the-art events. Instant Stripe
          booking guarantees your seat.
        </p>
      </div>

      {/* Interactive client-side filters wrapped in Suspense */}
      <Suspense
        fallback={
          <div className="h-28 w-full glass animate-pulse rounded-2xl" />
        }
      >
        <FilterPanel />
      </Suspense>

      {/* Server component events list wrapped in Suspense */}
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Card
                  key={i}
                  className="bg-slate-900/50 border border-white/5 p-4 space-y-4 animate-pulse"
                >
                  <div className="h-48 rounded-xl bg-slate-800" />
                  <div className="space-y-3">
                    <div className="h-4 bg-slate-800 w-3/5 rounded-lg" />
                    <div className="h-6 bg-slate-800 w-4/5 rounded-lg" />
                    <div className="h-4 bg-slate-800 w-2/5 rounded-lg" />
                  </div>
                </Card>
              ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lawyers.map((lawyer) => (
            <LawyerCard
              key={lawyer._id}
              lawyer={lawyer}
              buttonText="View Details"
            />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
