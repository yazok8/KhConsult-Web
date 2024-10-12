import React from "react";
import immigration from "../../../../../public/images/immigration.png";
import Image from "next/image";

export default function ImmigrationSupport() {
  return (
    <section
      id="immigration-support"
      className="flex max-w-6xl justify-center min-h-screen flex-wrap mx-auto"
    >
      <div className="flex mt-20">
        <div className="pr-8">
          <h1 className="text-5xl text-nowrap mb-5">Immigration Support</h1>
          <li className="text-lg">
            Our team consists of experts that have a huge experience with German
            immigration buracracy
          </li>
          <li className="text-lg">
            Your hub and all-round support for your immigration issues including
            application for your residence permits and perminant resdiency{" "}
          </li>
          <li className="text-lg"> Communicating with the immigration office on your behalf</li>
        </div>
        <div>
          <Image src={immigration} alt="immigration" width={2000} />
        </div>
      </div>
    </section>
  );
}
