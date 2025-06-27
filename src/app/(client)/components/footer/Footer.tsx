// src/app/(client)/components/footer/Footer.tsx
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
          {/* First column (General Navigation) */}
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
            <Link className="hover:underline" href="/#about">About</Link>
            <Link className="hover:underline" href="/#services">Services</Link>
            <Link className="hover:underline" href="#my-story">
              My Story
            </Link>
            <Link className="hover:underline" href="#contact">Contact</Link>
          </FooterList>

          {/* Second column (Legal/Information Links) - NEW SECTION */}
            <FooterList>


              <h3 className="text-base font-bold mb-2">Information</h3>
            <Link className="hover:underline" href="/impressum">Impressum</Link>
            <Link className="hover:underline" href="/privacy-policy">Privacy Policy</Link> {/* Will create this next */}
            <Link className="hover:underline" href="/terms-and-conditions">Terms & Conditions</Link> {/* Will create this next */}
            </FooterList>

        {/* Third column (Social Media) */}
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <SocialMedia />
          </FooterList>


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