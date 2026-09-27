function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition">

      <div className="h-48 bg-gray-200 flex items-center justify-center text-6xl">
        🏠
      </div>

      <div className="p-5">

        <h3 className="text-xl font-bold text-gray-800">
          {property.name}
        </h3>

        <p className="text-gray-500 mt-2">
          📍 {property.location}
        </p>

        <p className="text-blue-600 font-bold text-lg mt-3">
          ₹{property.rent} / month
        </p>

        <div className="flex justify-between mt-4 text-sm text-gray-600">

          <span>
            {property.gender === "girls" && "👩 Girls"}
            {property.gender === "boys" && "👨 Boys"}
            {property.gender === "unisex" && "👥 Unisex"}
          </span>

          <span>
            🛏️ {property.available_beds} Available
          </span>

        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-5 hover:bg-blue-700">
          View Details
        </button>

      </div>

    </div>
  );
}

export default PropertyCard;