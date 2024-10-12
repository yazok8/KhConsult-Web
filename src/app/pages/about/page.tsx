import Image from 'next/image'
import React from 'react'
import abphoto from "../../../../public/images/abphoto.png";

export default function AboutPage() {
  return (
    <>
      <section
        id="about"
        className="text-white bg-black flex flex-col items-center justify-center flex-wrap px-5 lg:px-0 min-h-screen"
      >
        <div className="max-w-6xl mx-auto w-full flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-20">
          {/* Heading */}
          <div className="w-full text-center lg:text-left py-8">
            <h1 className="text-5xl sm:text-6xl">About Me</h1>
          </div>

          {/* Content Container */}
          <div className="flex flex-col lg:flex-row-reverse lg:justify-between items-center lg:items-start w-full">
            
            {/* Image Section */}
            <div className="flex-shrink-0 mx-auto lg:ml-0">
              <Image
                src={abphoto}
                alt="Abdallah"
                layout="responsive"
                width={500}
                height={500}
                className="rounded-lg"
              />
            </div>

            {/* Text Section */}
            <div className="mt-6 lg:mt-0 lg:max-w-xl lg:mr-8">
              <p className="text-2xl text-center lg:text-left leading-relaxed">
                Hello, I’m Abdallah. I moved to Germany in 2017. I work as a social worker helping people every day in challenging and difficult situations. I enjoy my work and have experience in immigration, job coaching, and apartment hunting.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
