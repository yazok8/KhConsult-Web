import React from "react";
import immigration from "../../../../../public/images/immigration.png";
import Image from "next/image";

export default function GermanSpeaker() {
  return (
    <section
      id="need-a-german-speaker"
      className="flex max-w-6xl justify-center min-h-screen flex-wrap mx-auto"
    >
      <div className="flex mt-20">
        <div className="pr-8">
          <h1 className="text-5xl text-nowrap mb-5">Need A German Speaker</h1>
          <li className="text-lg">
          As a newcomer in Germany can be little overwhelming to communicate with the authorities, our team can help you with the following:        </li> 
          
          <li className="text-lg">
          Accompanying you to the authorities
          </li>
          <li className="text-lg">Filling out paper work </li>
          
  
          ........and mostly importantly give you a law-based advice
        </div>
        <div>
          <Image src={immigration} alt="immigration" width={2000} />
        </div>
      </div>
    </section>
  );
}
