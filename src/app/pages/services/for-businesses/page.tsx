import React from "react";
import forBusiness from "../../../../../public/images/forBusiness.svg";
import Image from "next/image";

export default function ForBusinesses() {
  return (
    <section
      id="for-businesses"
      className="flex max-w-6xl justify-center min-h-[50vh] flex-wrap mx-auto"
    >
      <div className="flex mt-20 mb-8">
        <div className="pr-8">
          <h1 className="text-5xl text-nowrap mb-5">For Businesses</h1>
          <div className="text-lg">
            Are you hiring emplyees from abroad, or you want support with
            residence permit applications, we got you covered. Our team can take
            over the process with the German beauracracy
          </div>
        </div>
      </div>
      <div>
          <Image src={forBusiness} alt="immigration" width={2000} />
        </div>
    </section>
  );
}
