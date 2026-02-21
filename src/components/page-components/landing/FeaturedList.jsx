import React from "react";
import Image from "next/image";

const FeaturedList = () => {
  const features = [
    {
      title: "Prestigious Bloodlines",
      description: "From majestic Brammas to adorable Silkies, our exotic hen breeds carry generations of premium heritage.",
      icon: "/Pleasant/pleasant2.jpg",
      bgColor: "bg-[var(--accent-coral)]",
    },
    {
      title: "Nutrition & Care",
      description: "Curated, high-quality nutrition and organic supplements tailored specifically for the vitality of fancy breeds.",
      icon: "/pet-food.png",
      bgColor: "bg-[var(--accent-yellow)]",
    },
    {
      title: "Boutique Enclosures",
      description: "Elegant, secure, and spacious housing designed to provide luxury comfort for your premium flock.",
      icon: "/accessories.jpg",
      bgColor: "bg-[var(--accent-mint)]",
    },
    {
      title: "Expert Avian Guidance",
      description: "Dedicated consultation from our master breeders to ensure your hens maintain peak health and plumage.",
      icon: "/Pleasant/pleasant4.jpg",
      bgColor: "bg-[var(--accent-teal)]",
    },
  ];

  return (
    <div className="w-full bg-[var(--bg-primary)] py-24 border-y-4 border-[var(--text-primary)] relative overflow-hidden">
      
      {/* Playful background pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20px 20px, var(--text-primary) 4px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-white text-[var(--accent-coral)] px-6 py-2 rounded-full font-bold uppercase tracking-widest text-sm mb-6 border-2 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] transform rotate-2">
            The Zion Standard
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-[var(--text-primary)]">
            Why Zion is the <span className="text-[var(--accent-teal)] drop-shadow-[2px_2px_0px_var(--text-primary)]">Premier Choice</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center p-8 rounded-3xl border-4 border-[var(--text-primary)] shadow-[8px_8px_0px_var(--text-primary)] ${feature.bgColor} transform transition-all hover:-translate-y-2 hover:shadow-[12px_12px_0px_var(--text-primary)] group`}
            >
              <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-[var(--text-primary)] shadow-[4px_4px_0px_var(--text-primary)] bg-white group-hover:rotate-12 transition-transform duration-300">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-black text-[var(--text-primary)] mb-3">{feature.title}</h3>
              <p className="text-sm text-[var(--text-primary)] font-medium opacity-90 leading-relaxed bg-white/50 p-4 rounded-xl border-2 border-[var(--text-primary)]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedList;
