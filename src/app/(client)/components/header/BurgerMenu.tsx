import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BsX } from 'react-icons/bs';
import khlogo from '../../../../../public/images/khlogo.svg';
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
    if (!isOpen) return;

    const handleClickOutsideMobileMenu = (event: MouseEvent) => {
      const target = event.target as Node;
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    // Prevent scrolling on body when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    document.addEventListener('mousedown', handleClickOutsideMobileMenu);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMobileMenu);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      ref={mobileMenuRef}
      className={`fixed top-0 left-0 w-[75%] sm:w-[60%] h-screen bg-[#ecf0f3] p-6 sm:p-10 
                 ease-in-out duration-300 z-50 text-black transform ${
                   isOpen ? 'translate-x-0' : '-translate-x-full'
                 } overflow-y-auto`}
    >
      <div className="flex w-full items-center justify-between mb-8">
        <Link href="/#" onClick={() => setIsOpen(false)}>
          <Image
            src={khlogo}
            alt="kh consultation logo"
            width={80}
            height={80}
            className="cursor-pointer w-auto h-auto"
          />
        </Link>
        <div className="cursor-pointer" onClick={toggleMenu}>
          <BsX className="h-8 w-8 text-black hover:text-[#f68519] transition-colors" />
        </div>
      </div>
      <div className="flex-col py-4">
        <ul className="space-y-2">
          <li
            className="py-3 text-lg font-medium hover:text-[#f68519] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/#about">About Our Services</Link>
          </li>
          <li
            className="py-3 text-lg font-medium hover:text-[#f68519] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/#team">My Story</Link>
          </li>
          <li
            className="py-3 text-lg font-medium hover:text-[#f68519] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/#services">Services</Link>
          </li>
          <li
            className="py-3 text-lg font-medium hover:text-[#f68519] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/#faq">FAQ</Link>
          </li>
          <li
            className="py-3 text-lg font-medium hover:text-[#f68519] transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <Link href="/#contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="mt-10">
        <SocialMedia />
      </div>
    </div>
  );
}

export default BurgerMenu;