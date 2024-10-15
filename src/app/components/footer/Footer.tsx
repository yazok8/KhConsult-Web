import Link from "next/link";

import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-black text-slate-200 text-sm mt-16">
      <div className="max-w-[1920px] mx-auto xl:px-20 md:px-2 px-4
    ">
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base font-bold mb-2"> KH Consult</h3>
            <Link className="hover:underline" href="#about">About</Link>
            <Link className="hover:underline" href="#about-my-services">Services</Link>
            <Link className="hover:underline" href="#reviews">Reviews</Link>
            <Link className="hover:underline" href="#contact">Contact</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Services</h3>
            <Link className="hover:underline" href="/#about-my-services">About My Services</Link>
            <Link className="hover:underline" href="/#relocation-services">Relocation Services</Link>
            <Link className="hover:underline" href="/#immigration-support">Immigration Support</Link>
            <Link className="hover:underline" href="/#job-coaching">Job Coaching</Link>
            <Link className="hover:underline" href="/#need-a-german-speaker">Need A German Speaker</Link>
            <Link className="hover:underline" href="/#for-businesses">For Businesses</Link>
          </FooterList>
          <div className="w-full flex items-end md:w-1/3 mb-6 md:mb-0">
            <p>&copy; {new Date().getFullYear()} KhConsult. All rights reserved</p>
          </div>
          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
            <div className="flex gap-2">
              <Link href="#">
                <MdFacebook size={24} />
              </Link>
              <Link href="#">
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href="#">
                <AiFillInstagram size={24} />
              </Link>
              <Link href="#">
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
