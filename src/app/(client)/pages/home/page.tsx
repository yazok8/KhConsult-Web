import Image from "next/image";
import React from "react";
import khlogo from "../../../../../public/images/khlogo.png";
import Typography from "@/components/Typography";

export default function Homepage() {
  return (
    <section
      id="home"
      className="relative h-screen text-center flex justify-center items-center px-5"
    >
      <div>
        <div className="flex flex-wrap justify-center items-center max-w-6xl mx-auto">
          {/* Image Container */}
          <div className="mr-4 md:mr-10 relative w-24 h-24 md:w-48 md:h-48 lg:w-60 lg:h-60">
            <Image
              src={khlogo}
              alt="KH Consultation Logo"
              fill
              sizes="(max-width: 768px) 96px, 
                     (max-width: 1024px) 192px,
                     240px"
              className="object-contain cursor-pointer"
              priority // Changed from lazy since this is above the fold
            />
          </div>

          {/* Text Container */}
          <div className="text-center m-auto max-w-min whitespace-nowrap flex-1">
            <Typography variant="h1">Relocation Services</Typography>
            <Typography variant="p" className="mt-8">
              If we did it! So can you!
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}