import React from "react";
import immigration from "../../../../../public/images/immigration.png";
import Image from "next/image";

export default function ImmigrationSupport() {
  return (
    <section
      id="immigration-support"
      className="flex justify-center min-h-screen lg:max-w-6xl flex-wrap mx-auto px-5 pt-20"
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start flex-grow w-full">
        {/* Text Section */}
        <div className="pr-0 lg:pr-16 lg:w-1/2 w-full mb-10 lg:mb-0">
          <h1 className=" lg:text-5xl mb-5">Immigration Support</h1>
          <ul className="text-lg space-y-4">
            <li>
              Our team consists of experts with vast experience navigating the German immigration bureaucracy.
            </li>
            <li>
              Your hub and all-round support for immigration issues, including applications for residence permits and permanent residency.
            </li>
            <li>
              Communicating with the immigration office on your behalf.
            </li>
          </ul>
        </div>
        
        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          <Image 
            src={immigration} 
            alt="Immigration support" 
            layout="responsive" 
            width={1000} 
            height={800} 
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
