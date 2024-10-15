import Image from "next/image";
import React from "react";
import khlogo from "../../../../public/images/khlogo.png";

export default function Homepage() {
  return (
    <div>
      <section
        id="home"
        className="text-black h-screen text-center flex justify-center items-center space-x-0 px-4"
      >
        <div className="flex max-w-6xl">       
           <div className="pr-10">
          <Image
            src={khlogo}
            alt="kh consultation logo"
            width={200}
            className="cursor-pointer mx-auto"
          />
        </div>
        <div className="text-center m-auto text-5xl max-w-min">
          <h1>Relocation Services</h1>
        </div>
        </div>

      </section>
    </div>
  );
}
