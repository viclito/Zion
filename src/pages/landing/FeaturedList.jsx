import React from "react";
import Image from "next/image";

const FeaturedList = () => {
  const features = [
    {
      title: "Wide Range of Pet Breeds",
      description:
        "From adorable puppies and kittens to exotic birds and hen breeds like Silkies, we have the perfect companion for your home.",
      icon: "/pet-care.jpg",
    },
    {
      title: "Premium Pet Products",
      description:
        "Shop high-quality food, treats, cages, toys, and bedding — everything your pet needs for a happy and healthy life.",
      icon: "/pet-food.png", // Replace with actual product-related icon
    },
    {
      title: "Pet Essentials & Accessories",
      description:
        "Find premium food, toys, bedding, cages, and accessories — everything your pet needs under one roof.",
      icon: "/accessories.jpg", // Replace with actual accessories icon
    },
    {
      title: "Expert Pet Care Guidance",
      description:
        "Our experienced staff offers guidance on pet health, nutrition, and training to keep your pets happy and healthy.",
      icon: "/pet-care.jpg", // Replace with actual pet care icon
    },
  ];

  return (
    <div className="w-full bg-gray-100 py-10 mb-5">
      <h2 className="text-center text-3xl font-bold mb-6">
        Why Zion is the best place for pets
      </h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              width={50}
              height={50}
              className="mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedList;
