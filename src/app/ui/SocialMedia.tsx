import Link from 'next/link'
import React from 'react'
import { BsYoutube, BsInstagram, BsFacebook, BsPinterest, BsLinkedin } from 'react-icons/bs';

export default function SocialMedia() {
  return (
    <>
          {/* Social Media Links */}
          <div className="flex flex-row pt-10 items-center gap-7 md:gap-12 flex-wrap">
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
          <BsLinkedin
            size={30}
            className="cursor-pointer ease-in-out duration-300"
          />
        </Link>
        <Link href="https://www.youtube.com">
          <BsYoutube
            size={30}
            className="cursor-pointer ease-in-out duration-300"
          />
        </Link>
      </div>
    </>
  )
}
