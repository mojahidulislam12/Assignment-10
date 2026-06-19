"use client";

import Image from "next/image";

const testimonials = [
  {
    name: "Rakib Hossain",
    role: "Business Owner",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "Great platform! I found an expert corporate lawyer within minutes. Very professional service.",
  },
  {
    name: "Nusrat Jahan",
    role: "Startup Founder",
    image: "https://i.pravatar.cc/150?img=16",
    review:
      "The lawyers are highly experienced. The booking system is very smooth and easy to use.",
  },
  {
    name: "Tanvir Ahmed",
    role: "Client",
    image: "https://i.pravatar.cc/150?img=17",
    review:
      "I got quick legal support for my property issue. Highly recommended platform!",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">
        💬 What Our Clients Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition"
          >
            {/* Review Text */}
            <p className="text-gray-600 italic mb-6">{item.review}</p>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <Image
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full"
              />

              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
