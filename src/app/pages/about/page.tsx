import Image from 'next/image'
import React from 'react'
import abphoto from "../../../../public/images/abphoto.png";

export default function AboutPage() {
    return (
      <>
        <section
          id="about"
          className="text-white bg-black h-screen flex flex-col items-center justify-center"
        >
          <div className='max-w-6xl mx-auto min-h-screen"'>
          <div className="text-5xl py-8 w-full">
            <h1>About me</h1>
          </div>
          <div className="md:flex flex-col sm:flex-row-reverse sm:justify-center items-start w-full sm:max-w-[90rem] mx-auto">
            <p className="text-2xl text-left pl-4 sm:max-w-3xl sm:flex-grow sm:flex-shrink max-w-3xl">
            Hello, im Abdallah. I moved to Germany in 2017. I work as a social worker that help people every  day in challenging and hardful situations. I enjoy that. I have experience in immigration, job coaching, apartment hunting.
            </p>
            <div className="flex-shrink-0 mx-auto">
              <Image
                src={abphoto}
                alt="kh consultation logo"
                width={500}
                height={500} // Ensuring image height is set
                className="cursor-pointer mx-auto"
              />
            </div>
          </div>
          </div>
        </section>
      </>
    );
  }
   