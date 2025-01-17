import Image from "next/image";
import React from "react";
import khlogo from "../../../../../public/images/khlogo.png";

export default function Homepage() {
  return (
    <section
      id="home"
      className="relative
    h-screen
    text-center
    flex
    justify-center
    items-center
    px-5">
      <div>
        <div className="flex max-w-6xl">
          <div className="pr-10">
            <Image
              src={khlogo}
              alt="kh consultation logo"
              width={300}
              className="cursor-pointer mx-auto"
            />
          </div>
          <div className="text-center m-auto text-5xl max-w-min whitespace-nowrap">
            <h1 className="text-6xl">Relocation Services</h1>
            <p className="mt-12">If we did it! So can you!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
