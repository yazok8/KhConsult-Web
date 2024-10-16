import React from 'react';
import ServiceCard from "../../../ui/ServiceCard";
import service1 from "../../../../../public/images/service1.svg";
import service2 from '../../../../../public/images/service2.jpg';
import service3 from '../../../../../public/images/service3.svg';
import service4 from '../../../../../public/images/service4.svg'; // For business services
import BusinessServiceCard from '@/app/ui/forbusiness-service/BusinessServiceCard';


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
];

export default function RelocationServices() {
  return (
    <section
      id="relocation-services"
      className="bg-black text-white min-h-screen pt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-8">
        <h1 className=" md:text-5xl lg:text-6xl text-center mb-12">
          Relocation Services
        </h1>

        {/* Responsive Flex Layout */}
        <div className="flex flex-col lg:flex-row justify-between gap-16">
          
          {/* Individual Services */}
          <div className="lg:w-full w-full">
            <h2 className="text-3xl md: lg:text-5xl text-center lg:text-left py-6">
              For Individuals
            </h2>
            {/* Responsive gap between services */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-40 justify-items-center">
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

          {/* Business Services */}
          <div className="w-full lg:flex flex-col items-center">
            <h2 className="text-3xl md: lg:text-5xl text-center lg:text-left py-6">
              For Businesses
            </h2>
            <div className="flex justify-center items-center w-full pb-8 lg:pb-0 mt-0">
              {businessServices.map((service, index) => (
                <BusinessServiceCard
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
