"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import khlogo from "../../../public/images/khlogo.png";
import {
  BsFacebook,
  BsInstagram,
  BsList,
  BsPinterest,
  BsX,
  BsYoutube,
} from "react-icons/bs";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header>
      <nav className="w-full fixed h-15 shadow-xl bg-black">
        <div className="px-10 flex items-center justify-between h-full">
          <Link href="/#">
            <Image
              src={khlogo}
              alt="kh consultation logo"
              width={60}
              height={50}
              className="cursor-pointer"
            />
          </Link>
          <div className="text-white hidden md:flex text-xl">
            <Link className="px-5" href="/#about">
              About
            </Link>
            <Link className="px-5" href="/#services">
              Services
            </Link>
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
            <div className="flex justify-end mr-auto cursor-pointer" onClick={()=>setIsOpen(false)}>
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
              <li
                className="py-4 hover:underline hover:decoration-[#f68519]"
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
          {/* Social Media Links */}
          <div className="flex flex-row justify-around pt-10 items-center">
            <Link href="https://wwww.youtube.com">
              <BsYoutube
                size={30}
                className="cursor-pointer ease-in-out duration-300"
              />
            </Link>
            <Link href="https://wwww.instagram.com">
              <BsInstagram
                size={30}
                className="cursor-pointer ease-in-out duration-300"
              />
            </Link>
            <Link href="https://wwww.instagram.com">
              <BsFacebook
                size={30}
                className="cursor-pointer ease-in-out duration-300"
              />
            </Link>
            <Link href="https://wwww.instagram.com">
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
