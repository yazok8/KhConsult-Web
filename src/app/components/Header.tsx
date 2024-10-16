"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BsList } from 'react-icons/bs';
import khlogo from '../../../public/images/khlogo.png'; // Adjust the path as necessary
import BurgerMenu from '../ui/BurgerMenu';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [isServicesOpen, setIsServicesOpen] = useState(false); // Services dropdown state

  const toggleMenu = () => setIsOpen(prev => !prev);

  // Define refs with correct types
  const desktopServicesRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the "Services" dropdown
  useEffect(() => {
    const handleClickOutsideServices = (event: MouseEvent) => {
      const target = event.target as Node;

      const isClickOutsideDesktop =
        desktopServicesRef.current && !desktopServicesRef.current.contains(target);

      if (isClickOutsideDesktop) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideServices);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideServices);
    };
  }, []);

  return (
    <header>
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
            <Link className="px-5" href="/#about">
              About
            </Link>

            {/* Desktop Services Menu */}
            <div className="relative" ref={desktopServicesRef}>
              <button
                className="px-5 focus:outline-none"
                onClick={() => setIsServicesOpen(prev => !prev)}
                aria-haspopup="true"
                aria-expanded={isServicesOpen}
              >
                Services
              </button>
              {isServicesOpen && (
                <ul className="absolute bg-white text-black mt-4 rounded shadow-lg">
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/#about-my-services">About my Services</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/#relocation-services">Relocation Services</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/#immigration-support">Immigration Support</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/#job-coaching">Job Coaching</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/#need-a-german-speaker">Need A German Speaker</Link>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-200">
                    <Link href="/#for-businesses">For Businesses</Link>
                  </li>
                </ul>
              )}
            </div>

            <Link className="px-5" href="/#reviews">
              Reviews
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
      </nav>
    </header>
  );
}
