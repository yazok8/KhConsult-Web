import Link from 'next/link'
import React, { useState } from 'react';
import { RiCalendarScheduleLine } from 'react-icons/ri';


export default function AppointmentBtn() {
    const [isTextVisible, setIsTextVisible] = useState(true);
      // Handler to hide the text upon clicking the icon
  const handleClick = () => {
    setIsTextVisible(false);
  };
  return (
    <div className="fixed bottom-4 right-2 md:bottom-10 md:right-10 z-50">
    <Link href="https://callmi.co/expert/abdallahkhirfan" target="_blank" passHref>
    <button
          onClick={handleClick}
          className="flex flex-col items-center bg-primary-color text-black dark:text-white rounded-full md:p-4"
          aria-label="Book an appointment"
        >
       {/* Conditionally render the text */}
       {isTextVisible && (
         <span className="mb-2 text-md font-medium bg-white text-primary-color px-1 py-1 rounded-md shadow-md">
           Book an appointment
         </span>
       )}
       {/* Icon Container */}
       <div
         className="flex p-3 justify-center hover:bg-secondary-color rounded-full items-center w-20 h-20"
         onClick={handleClick}
       >
         <RiCalendarScheduleLine size={50} className="fill-slate-600 text-white group-hover:text-black transition-colors duration-300 motion-safe:animate-jump" />
       </div>
     </button>
   </Link>
 </div>
  )
}
