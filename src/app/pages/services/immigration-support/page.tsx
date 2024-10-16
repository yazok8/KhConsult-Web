import React from "react";
import immigration from "../../../../../public/images/immigration.png";
import Image from "next/image";
import Container from "@/app/ui/Container";




export default function ImmigrationSupport({}) {
  return (
    <Container id="immigration-support">
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
    </Container>
  );
}
