"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BsList, BsX } from 'react-icons/bs';
import khlogo from '../../../../../public/images/khlogo.svg';
import BurgerMenu from './BurgerMenu';
import AppointmentBtn from '../AppointmentBtn';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const desktopServicesRef = useRef<HTMLDivElement>(null); // Still useful if you plan a dropdown

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`w-full fixed h-16 sm:h-20 shadow-xl bg-black z-50 transition-all duration-300 ${
          scrolled ? 'bg-opacity-95' : 'bg-opacity-100'
        }`}
      >
        {/* Main container for header content: Logo | (Nav Links + Right-aligned elements) */}
        <div className="px-4 md:px-0 flex justify-between h-full max-w-6xl mx-auto items-center">

          {/* Logo - First direct child, pushed to the left */}
          <Link href="/#">
            <Image
              src={khlogo}
              alt="kh consultation logo"
              width={100}
              height={100}
              className="cursor-pointer w-auto h-10 sm:h-12"
              priority
            />
          </Link>

          {/* Right-side container: Holds Desktop Nav Links & Appointment Button / Mobile Toggle */}
          {/* This is the second direct child, pushed to the right by parent's justify-between */}
          <div className="flex items-center"> {/* Use flex to arrange its children */}

            {/* Desktop Navigation Links - Hidden on mobile */}
            <div className="text-white hidden md:flex text-xl"> {/* No flex-grow, just normal flex spacing */}
              <Link className="px-5" href="#about">
                About
              </Link>
              <Link className="px-5" href="/#story">
                My Story
              </Link>

              {/* Services Link */}
              <div className="relative" ref={desktopServicesRef}>
                <Link
                  className="px-2 lg:px-4 whitespace-nowrap hover:text-[#f68519] transition-colors"
                  href="/#services"
                >
                  Services
                </Link>
              </div>

              <Link
                className="px-2 lg:px-4 whitespace-nowrap hover:text-[#f68519] transition-colors"
                href="/#faq"
              >
                FAQ
              </Link>
              <Link
                className="px-2 lg:px-4 whitespace-nowrap hover:text-[#f68519] transition-colors"
                href="/#contact"
              >
                Contact
              </Link>
            </div>


            <div className="hidden lg:block"> 
              <AppointmentBtn />
            </div>


            <div className="flex items-center space-x-4 md:hidden"> 
              <AppointmentBtn />
              <div
                className="cursor-pointer text-white"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <BsX className="h-8 w-8 hover:text-[#f68519] transition-colors" />
                ) : (
                  <BsList className="h-8 w-8 hover:text-[#f68519] transition-colors" />
                )}
              </div>
            </div>

          </div> 

        </div>

        <BurgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </nav>
      {/* Spacer to prevent content from being hidden under fixed navbar */}
      <div className="h-16 sm:h-20"></div>
    </>
  );
}