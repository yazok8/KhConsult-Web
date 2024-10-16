import React from "react";
import germanSpeaker from "../../../../../public/images/germanSpeaker.jpg";
import Image from "next/image";
import Container from "@/app/ui/Container";

export default function GermanSpeaker() {
  return (
    <Container id="need-a-german-speaker">
      <div className="flex flex-col lg:flex-row items-center lg:items-start flex-grow w-full">
        {/* Text Section */}
        <div className="pr-0 lg:pr-16 lg:w-1/2 w-full mb-10 lg:mb-0">
          <h1 className=" lg:text-5xl mb-6">Need A German Speaker</h1>
          <ul className="text-lg space-y-4">
            <li>
              As a newcomer in Germany, communication with the authorities can
              be overwhelming. Our team can help with the following:
            </li>
            <li>Accompanying you to the authorities</li>
            <li>Filling out paperwork</li>
            <li>And most importantly, giving you law-based advice.</li>
          </ul>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 w-full">
          <Image
            src={germanSpeaker}
            alt="immigration"
            layout="responsive"
            width={2000}
            height={1500}
            className="rounded-lg"
          />
        </div>
      </div>
    </Container>
  );
}
