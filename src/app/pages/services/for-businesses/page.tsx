import React from "react";
import forBusiness from "../../../../../public/images/forBusiness.svg";
import Image from "next/image";

export default function ForBusinesses() {
  return (
    <section
      id="for-businesses"
      className="flex justify-center min-h-screen lg:max-w-6xl flex-wrap mx-auto px-5 py-12"
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start flex-grow w-full">
        {/* Text Section */}
        <div className="pr-0 lg:pr-16 lg:w-1/2 w-full mb-10 lg:mb-0">
          <h1 className="text-4xl lg:text-5xl mb-6">For Businesses</h1>
          <div className="text-lg space-y-4 leading-relaxed">
            <p>
              Are you hiring employees from abroad, or do you need support with residence permit applications? We've got you covered.
            </p>
            <p>
              Our team can take over the process and handle the complexities of the German bureaucracy.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          <Image 
            src={forBusiness} 
            alt="For Businesses" 
            layout="responsive" 
            width={2000} 
            height={1500} 
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
