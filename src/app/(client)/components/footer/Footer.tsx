import Link from "next/link";
import khlogo from "../../../../../public/images/khlogo.png"
import FooterList from "./FooterList";
import Image from "next/image";
import SocialMedia from "@/components/SocialMedia";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-md mt-16">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 xl:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-16 pb-8">
          {/* First column */}
          <FooterList>
            <div className="pb-5">
              <Link href="/#">
                <Image
                  src={khlogo}
                  alt="kh consultation logo"
                  width={50}
                  className="cursor-pointer"
                />
              </Link>
            </div>
            <Link className="hover:underline" href="#about">About</Link>
            <Link className="hover:underline" href="#about-my-services">Services</Link>
            <Link className="hover:underline" href="#reviews">Reviews</Link>
            <Link className="hover:underline" href="#contact">Contact</Link>
          </FooterList>
          
          {/* Second column */}
          <div className="w-full text-white">
            <h3 className="text-base font-bold mb-2">Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 md:gap-6">
              <Link className="hover:underline" href="/#about-my-services">About My Services</Link>
              <Link className="hover:underline" href="/#relocation-services">Relocation Services</Link>
              <Link className="hover:underline" href="/#immigration-support">Immigration Support</Link>
              <Link className="hover:underline" href="/#job-coaching">Job Coaching</Link>
              <Link className="hover:underline" href="/#need-a-german-speaker">Need A German Speaker</Link>
              <Link className="hover:underline" href="/#for-businesses">For Businesses</Link>
            </div>
          </div>
          
          {/* Third column */}
          <div className="sm:justify-self-end lg:justify-self-center">
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <SocialMedia />
          </div>
        </div>
        
        {/* Copyright section */}
        <div className="w-full flex items-center justify-center pb-6">
          <p className="text-center text-sm">© Kh Consult, 2024. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;