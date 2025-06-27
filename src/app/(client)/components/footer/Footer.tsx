import Link from "next/link";
import khlogo from "../../../../../public/images/khlogo.png"
import FooterList from "./FooterList";
import Image from "next/image";
import SocialMedia from "@/components/SocialMedia";

const Footer = () => {
  return (
    <footer className="bg-black text-slate-200 text-sm mt-16">
      <div className="max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4
    ">
        <div className="flex flex-col sm:flex-row justify-between pt-16 pb-8">
          <FooterList>
          <div className=" pb-5">
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

          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
          <SocialMedia />
          </FooterList>

        </div>
        <div className="w-full flex items-end justify-center mx-auto sm:w-1/3 md:mb-0">
            <p>© GSK LTD., 2024. All rights reserved</p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
