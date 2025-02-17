"use client";

import React, { useRef,useEffect } from 'react';
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


  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(prev => !prev);



  // Handle clicks outside the mobile menu
  useEffect(() => {
    if (!isOpen) return; // Only add listener if the mobile menu is open

    const handleClickOutsideMobileMenu = (event: MouseEvent) => {
      const target = event.target as Node;
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setIsOpen(false);
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
      className="fixed top-0 left-0 w-[75%] md:hidden h-screen bg-[#ecf0f3] p-10 ease-in-out duration-500 z-5 text-black"
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
              width={100}
              height={100}
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
          <li
            className="py-4 relative"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/#services">Services</Link>
          </li>
          <li
            className="py-4"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/#faq">Faq</Link>
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
