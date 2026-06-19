"use client";

const stats = [
  {
    label: "Lawyers",
    value: "500+",
    icon: "⚖️",
  },
  {
    label: "Clients",
    value: "2000+",
    icon: "👥",
  },
  {
    label: "Cases Solved",
    value: "5000+",
    icon: "📁",
  },
];

const StatisticsSection = () => {
  return (
    <section className="py-16 px-4 bg-black text-white">
      <h2 className="text-3xl font-bold text-center mb-12">
        📊 Our Impact in Numbers
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {stats.map((item, index) => (
          <div
            key={index}
            className="text-center p-8 border border-gray-700 rounded-2xl hover:bg-gray-900 transition"
          >
            <div className="text-4xl mb-3">{item.icon}</div>

            <h3 className="text-4xl font-bold text-green-400">{item.value}</h3>

            <p className="text-gray-300 mt-2">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatisticsSection;
