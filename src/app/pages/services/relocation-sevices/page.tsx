// components/RelocationServices.tsx
import React from 'react';
import ServiceCard from "../../../ui/ServiceCard";
import service1 from "../../../../../public/images/service1.svg";
import service2 from '../../../../../public/images/service2.svg';
import service3 from '../../../../../public/images/service3.svg';
import service4 from '../../../../../public/images/service4.svg'; // For business services

const individualServices = [
  {
    imageSrc: service1,
    title: "Immigration Support",
    description: "Filling out forms and help throughout the process",
  },
  {
    imageSrc: service2,
    title: "Job Coaching",
    description: "Assist you in finding a job in Germany",
  },
  {
    imageSrc: service3,
    title: "Need a German speaker?",
    description: "Assistance on finding a flat, registering your address, getting a Tax ID, and much more",
  },
];

const businessServices = [
  {
    imageSrc: service4,
    title: "Corporate Relocation",
    description: "Comprehensive relocation packages tailored for businesses and their employees.",
  },
  // Add more business services as needed
];

export default function RelocationServices() {
  return (
    <section
      id="relocation-services"
      className="bg-black text-white min-h-screen lg:h-[75vh] md:h-[120vh] pt-20 "
    >
      <div className="max-w-6xl justify-center mx-auto">
      <h1 className="text-5xl md:text-6xl lg:text-7xl mb-12">Relocation Services</h1>
      <div className="pt-16 flex flex-col lg:flex-row justify-center items-start gap-12 px-4">
        {/* Individual Section */}
        <div className="mb-12 lg:mb-0 text-center">
          <h2 className="py-6 text-4xl md:text-5xl text-nowrap">For Individuals</h2>
          <div className="flex justify-center space-x-6 flex-wrap lg:flex-nowrap space-y-6 lg:space-y-0">
            {individualServices.map((service, index) => (
              <ServiceCard
                key={index}
                imageSrc={service.imageSrc}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>

        {/* Business Section */}
        <div className="flex flex-col items-center">
          <h2 className="py-6 text-4xl md:text-5xl text-nowrap">For Businesses</h2>
          <div className="flex justify-center space-x-6 flex-wrap lg:flex-nowrap space-y-6 lg:space-y-0">
            {businessServices.map((service, index) => (
              <ServiceCard
                key={index}
                imageSrc={service.imageSrc}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
