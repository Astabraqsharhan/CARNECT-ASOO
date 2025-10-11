import React from "react";

// بيانات وهمية حالياً
const mockServices = [
  { _id: 1, name: "Car Wash", description: "Professional car cleaning service" },
  { _id: 2, name: "Oil Change", description: "High-quality engine oil replacement" },
  { _id: 3, name: "Tire Service", description: "Tire rotation and alignment" },
  { _id: 4, name: "Battery Check", description: "Complete battery inspection" },
  { _id: 5, name: "Brake Service", description: "Brake pads replacement and check" },
  { _id: 6, name: "Engine Repair", description: "Full engine diagnostics and repair" },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen p-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <h1 className="text-4xl font-bold mb-8 text-center text-black dark:text-white">
        Our Services
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockServices.map((service) => (
          <div
            key={service._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <h2 className="text-2xl font-semibold mb-2 text-black dark:text-white">
              {service.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}