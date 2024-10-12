import React from "react";
import coaching from "../../../../../public/images/coaching.svg";
import Image from "next/image";

export default function JobCoaching() {
  return (
    <section
      id="job-coaching"
      className="flex max-w-6xl justify-center min-h-screen flex-wrap mx-auto"
    >
      <div className="flex mt-20">
        <div className="pr-8">
          <h1 className="text-5xl text-nowrap mb-5">Job Coaching </h1>
          <li className="text-lg">
            We provide 1 to 1 job coaching and advice all-around German work
            market
          </li>
          <li className="text-lg">
            We supprot you through out the job search process : Proof checking
            your job application ( Cover letter and CV), helping you prepare for
            interview and check out your job contract
          </li>
        </div>
        <div>
          <Image src={coaching} alt="immigration" width={2000} />
        </div>
      </div>
    </section>
  );
}
