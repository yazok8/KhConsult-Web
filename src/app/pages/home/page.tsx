import Image from "next/image";
import React from "react";
import khlogo from "../../../../public/images/khlogo.png";

export default function Homepage() {
  return (
    <div>
      <section
        id="home"
        className="text-black h-screen text-center flex justify-center items-center space-x-0"
      >
        <div>
          <Image
            src={khlogo}
            alt="kh consultation logo"
            width={500}
            className="cursor-pointer mx-auto"
          />
        </div>
        <div className="text-center m-auto text-5xl">
          <h1>Relocation Services</h1>
        </div>
      </section>
    </div>
  );
}
