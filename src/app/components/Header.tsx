"use client"

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BsList, BsX, BsYoutube, BsInstagram, BsFacebook, BsPinterest } from 'react-icons/bs';
import khlogo from '../../../public/images/khlogo.svg'; // Adjust the path as necessary

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const desktopServicesRef = useRef(null);
  const mobileServicesRef = useRef(null);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     const path = event.composedPath();
  //     if (desktopServicesRef.current && !path.includes(desktopServicesRef.current)) {
  //       setIsServicesOpen(false);
  //     }
  //   };
  
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [desktopServicesRef]);

  return (
    <header>
      <nav className="w-full fixed h-16 shadow-xl bg-black">
        <div className="px-10 flex items-center justify-between h-full">
          <Link href="/#">
            <Image
              src={khlogo}
              alt="kh consultation logo"
              width={100}
              className="cursor-pointer"
            />
          </Link>
          <div className="text-white hidden md:flex text-xl">
            <Link className="px-5" href="/#about">
              About
            </Link>

            <div className="relative" ref={desktopServicesRef}>
              <button
                className="px-5 focus:outline-none"
                onMouseOver={() => setIsServicesOpen(!isServicesOpen)}
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Services
              </button>
              {isServicesOpen && (
                <ul className="absolute bg-white text-black mt-4 text-nowrap">
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
          >
            <BsList className="h-8 w-8" />
          </div>
        </div>
        <div
          className={
            isOpen
              ? "fixed top-0 left-0 w-[75%] md:hidden h-screen bg-[#ecf0f3] p-10 ease-in-out duration-500"
              : "fixed left-[-100%] top-0 p-10 ease-in-out duration-500 h-screen"
          }
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
                className="py-4 hover:underline hover:decoration-[#f68519]"
                onClick={() => setIsOpen(false)}
              >
                <Link href="/#about">About</Link>
              </li>
              <li className="py-4 hover:underline hover:decoration-[#f68519]" ref={mobileServicesRef}>
                <div onClick={() => setIsServicesOpen(!isServicesOpen)}>
                  Services
                </div>
                {isServicesOpen && (
                  <ul className="pl-4">
                  <li className="py-2 hover:bg-gray-200">
                    <Link href="/#about-my-services">About my Services</Link>
                  </li>
                  <li className="py-2 hover:bg-gray-200">
                    <Link href="/#relocation-services">Relocation Services</Link>
                  </li>
                  <li className="py-2 hover:bg-gray-200">
                    <Link href="/#immigration-support">Immigration Support</Link>
                  </li>
                  <li className="py-2 hover:bg-gray-200">
                    <Link href="/#job-coaching">Job Coaching</Link>
                  </li>
                  <li className="py-2 hover:bg-gray-200">
                    <Link href="/#need-a-german-speaker">Need A German Speaker</Link>
                  </li>
                  <li className="py-2 hover:bg-gray-200">
                    <Link href="/#for-businesses">For Businesses</Link>
                  </li>
                  </ul>
                )}
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
          {/* Social Media Links */}
          <div className="flex flex-row justify-around pt-10 items-center">
            <Link href="https://www.youtube.com">
              <BsYoutube
                size={30}
                className="cursor-pointer ease-in-out duration-300"
              />
            </Link>
            <Link href="https://www.instagram.com">
              <BsInstagram
                size={30}
                className="cursor-pointer ease-in-out duration-300"
              />
            </Link>
            <Link href="https://www.facebook.com">
              <BsFacebook
                size={30}
                className="cursor-pointer ease-in-out duration-300"
              />
            </Link>
            <Link href="https://www.pinterest.com">
              <BsPinterest
                size={30}
                className="cursor-pointer ease-in-out duration-300"
              />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
