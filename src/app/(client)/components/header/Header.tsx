"use client";

import React, {useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BsList } from 'react-icons/bs';
import khlogo from '../../../../../public/images/khlogo.svg'; // Adjust the path as necessary
import BurgerMenu from './BurgerMenu';
import AppointmentBtn from '../AppointmentBtn';


export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  
  const toggleMenu = () => setIsOpen(prev => !prev);

  // Define refs with correct types
  const desktopServicesRef = useRef<HTMLDivElement>(null);


  return (
    <>
      <nav className="w-full fixed h-16 shadow-xl bg-black z-50">
        <div className="px-10 flex items-center justify-between h-full">
          <Link href="/#">
            <Image
              src={khlogo}
              alt="kh consultation logo"
              width={50}
              height={50}
              className="cursor-pointer"
            />
          </Link>
          <div className="text-white hidden md:flex text-xl">
            <Link className="px-5" href="#about">
              About
            </Link>
            <Link className="px-5" href="/#story">
              My Story
            </Link>

            {/* Desktop Services Menu */}
            <div className="relative" ref={desktopServicesRef}>
            <Link className="px-5" href="/#services">
              Services
            </Link>
            </div>

            <Link className="px-5" href="/#faq">
              FAQ
            </Link>
            <Link className="px-5" href="/#contact">
              Contact
            </Link>
          </div>
          <div
            className="md:hidden cursor-pointer pl-24 text-md text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <BsList className="h-8 w-8" />
          </div>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
      <AppointmentBtn />
      </nav>
    </>
  );
}
