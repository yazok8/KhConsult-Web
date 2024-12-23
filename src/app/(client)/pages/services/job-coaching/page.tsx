import React from "react";
import coaching from "../../../../../../public/images/coaching.jpg";
import Image from "next/image";
import Container from "@/app/ui/Container";

export default function JobCoaching() {
  return (
    <Container
    id="job-coaching">
      <div className="lg:w-1/2 w-full pr-0 lg:pr-8 mb-8 lg:mb-0">
        <h1 className=" lg:text-5xl mb-5">Job Coaching</h1>
        <ul className="space-y-4 text-lg">
          <li>
            We provide 1 to 1 job coaching and advice all-around the German work
            market.
          </li>
          <li>
            We support you throughout the job search process: Proof-checking
            your job application (Cover letter and CV), helping you prepare for
            interviews, and checking your job contract.
          </li>
        </ul>
      </div>

      <div className="lg:w-1/2 w-full">
        <Image
          src={coaching}
          alt="Job coaching"
          width={800}
          height={600}
          className="rounded-lg"
        />
      </div>
    </Container>
  );
}
