import Link from "next/link";
import Image from "next/image";
import { Button, Chip, Card } from "@heroui/react";
import { FaArrowLeft } from "react-icons/fa";
//import HireButton from "@/Components/Lawyer/HireButton";
import { baseUrl } from "@/lib/api/baseUrl";
//import BookingModal from "@/Components/Lawyer/BookingModal";

const fetchSingleLawyer = async (id) => {
  const res = await fetch(`${baseUrl}/api/single-lawyer/${id}`);
  const data = await res.json();
  return data;
};

export default async function LawyerDetailsPage({ params }) {
  const { id } = await params;

  const lawyer = await fetchSingleLawyer(id);

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-6 py-12 space-y-10">
      {/* Back Button */}
      <Link href="/lawyers">
        <Button variant="light" startContent={<FaArrowLeft />}>
          Back to Lawyers
        </Button>
      </Link>

      {/* Banner */}
      <div className="relative w-full h-[350px] rounded-3xl overflow-hidden">
        <Image
          src={lawyer.image}
          alt={lawyer.name}
          fill
          priority
          className="object-cover"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-bold">{lawyer.name}</h1>

            <div className="mt-4 flex gap-3 flex-wrap">
              <Chip color="primary">{lawyer.specialization}</Chip>

              <Chip
                color={lawyer.status === "available" ? "success" : "warning"}
              >
                {lawyer.status}
              </Chip>
            </div>
          </div>

          {/* Bio */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Professional Summary
            </h2>

            <p className="text-default-500 leading-8">{lawyer.bio}</p>
          </Card>

          {/* Information */}
          <Card className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Information</h2>

            <div className="flex justify-between">
              <span>Consultation Fee</span>
              <span>${lawyer.fee}</span>
            </div>

            <div className="flex justify-between">
              <span>Status</span>
              <span>{lawyer.status}</span>
            </div>

            <div className="flex justify-between">
              <span>Date Joined</span>
              <span>{new Date(lawyer.createdAt).toLocaleDateString()}</span>
            </div>
          </Card>
        </div>

        {/* RIGHT */}
        <div>
          <Card className="p-6 sticky top-20 space-y-5">
            <h2 className="text-2xl font-bold">Hire Lawyer</h2>

            <div className="flex justify-between">
              <span>Consultation Fee</span>
              <span>${lawyer.fee}</span>
            </div>

            <div className="flex justify-between">
              <span>Status</span>
              <span>{lawyer.status}</span>
            </div>
            <Link href={`/browseLawyer/${id}/apply`}>
              <button className="btn">Hire for this Lawyer</button>
            </Link>

            {/* <HireButton lawyer={lawyer} /> */}
          </Card>
        </div>
      </div>
    </div>
  );
}
