"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BsX } from 'react-icons/bs';
import khlogo from '../../../../../public/images/khlogo.svg'; // Adjust the path as necessary
import SocialMedia from '../../../../components/SocialMedia';

interface BurgerMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function BurgerMenu({ isOpen, setIsOpen }: BurgerMenuProps) {
  const [isServicesOpen, setIsServicesOpen] = useState(false); // Services dropdown state

  const mobileServicesRef = useRef<HTMLLIElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(prev => !prev);

  // Handle clicks outside the "Services" dropdown
  useEffect(() => {
    const handleClickOutsideServices = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        mobileServicesRef.current &&
        !mobileServicesRef.current.contains(target)
      ) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideServices);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideServices);
    };
  }, []);

  // Handle clicks outside the mobile menu
  useEffect(() => {
    if (!isOpen) return; // Only add listener if the mobile menu is open

    const handleClickOutsideMobileMenu = (event: MouseEvent) => {
      const target = event.target as Node;
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setIsOpen(false);
        setIsServicesOpen(false); // Close the "Services" dropdown as well
      }
    };

    document.addEventListener('mousedown', handleClickOutsideMobileMenu);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMobileMenu);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      ref={mobileMenuRef}
      className="fixed top-0 left-0 w-[75%] md:hidden h-screen bg-[#ecf0f3] p-10 ease-in-out duration-500 z-50"
    >
      <div className="flex w-full items-center justify-end">
        <div
          className="flex justify-end mr-auto cursor-pointer"
          onClick={() => setIsOpen(false)}
        >
          <Link href="/#">
            <Image
              src={khlogo}
              alt="kh consultation logo"
              width={60}
              height={50}
              className="cursor-pointer"
            />
          </Link>
        </div>
        <div className="cursor-pointer" onClick={toggleMenu}>
          <BsX className="h-8 w-8 text-black" />
        </div>
      </div>
      <div className="flex-col py-4">
        <ul>
          <li
            className="py-4"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/#about">About</Link>
          </li>
          <li
            className="py-4"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/#team">Team</Link>
          </li>
          {/* Mobile Services Menu */}
          <li
            className="py-4 relative"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/#services">Services</Link>
          </li>
          <li
            className="py-4 hover:underline hover:decoration-[#f68519]"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/#reviews">Reviews</Link>
          </li>
          <li
            className="py-4 hover:underline hover:decoration-[#f68519]"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/#contact">Contact</Link>
          </li>
        </ul>
      </div>
    <SocialMedia/>
    </div>
  );
}

export default BurgerMenu;
