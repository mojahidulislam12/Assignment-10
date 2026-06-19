"use client";

const LegalCategoriesCard = ({ lawyers }) => {
  // unique categories
  const categories = [...new Set(lawyers.map((l) => l.specialization))];

  return (
    <section className="py-12 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">
        ⚖️ Legal Categories
      </h2>

      <div className="container mx-auto grid gap-6 grid-cols-2 md:grid-cols-4">
        {categories.map((cat) => {
          const count = lawyers.filter((l) => l.specialization === cat).length;

          return (
            <div
              key={cat}
              className="bg-white border rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition cursor-pointer"
            >
              <div className="text-4xl mb-3">⚖️</div>

              <h3 className="text-lg font-semibold">{cat}</h3>

              <p className="text-sm text-gray-500 mt-1">{count} Lawyers</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LegalCategoriesCard;
