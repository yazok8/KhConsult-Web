import Link from "next/link";
import khlogo from "../../../../../public/images/khlogo.png"
import FooterList from "./FooterList";
import Image from "next/image";
import SocialMedia from "@/components/SocialMedia";

const Footer = () => {
  return (
    <footer className="bg-black text-slate-200 text-sm mt-16">
      <div className="max-w-[1920px] mx-auto xl:px-20 md:px-2
    ">
        <div className="flex flex-col sm:flex-row justify-between gap-2 pt-16 pb-8">
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
            <Link className="hover:underline" href="#about">About</Link>
            <Link className="hover:underline" href="#about-my-services">Services</Link>
            <Link className="hover:underline" href="#reviews">Reviews</Link>
            <Link className="hover:underline" href="#contact">Contact</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-white">
              <li>
                <Link href="/privacy-policy" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-gray-300">
                  Terms Of Service
                </Link>
              </li>
            </ul>
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

          <FooterList>
            <h3 className="text-base font-bold mb-2">Follow Us</h3>
          <SocialMedia />
          </FooterList>

        </div>
        <div className="w-full flex items-end justify-center mx-auto whitespace-nowrap- sm:w-1/3">
            <p className="mb-2">© Kh Consult, 2024. All rights reserved</p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
