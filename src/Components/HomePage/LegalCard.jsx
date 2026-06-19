"use client";

import Image from "next/image";

const LegalCard = ({ lawyers = [] }) => {
  const topLawyers = [...lawyers]
    .sort((a, b) => b.totalHires - a.totalHires)
    .slice(0, 3);

  return (
    <section className="py-10 px-4 container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        🏆 Top Legal Experts
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {topLawyers.map((lawyer, index) => (
          <div
            key={lawyer._id}
            className="border rounded-2xl p-5 shadow-md hover:shadow-xl transition bg-white"
          >
            {/* Rank Badge */}
            <div className="text-center mb-2">
              <span className="text-sm bg-black text-white px-3 py-1 rounded-full">
                #{index + 1} Most Hired
              </span>
            </div>

            <Image
              src={lawyer.image}
              alt={lawyer.name}
              width={90}
              height={90}
              className="rounded-full mx-auto"
            />

            <h3 className="text-lg font-semibold text-center mt-3">
              {lawyer.name}
            </h3>

            <p className="text-center text-gray-500">{lawyer.specialization}</p>

            <p className="text-center mt-2 text-green-600 font-bold">
              💼 {lawyer.totalHires} Hires
            </p>

            <p className="text-center text-sm text-gray-500">
              📍 {lawyer.location}
            </p>

            <p className="text-center font-semibold mt-1">
              💰 ${lawyer.fee} / session
            </p>

            <button className="w-full mt-4 bg-black text-white py-2 rounded-xl hover:bg-gray-800">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LegalCard;
