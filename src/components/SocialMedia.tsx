import Link from 'next/link'
import React from 'react'
import { BsLinkedin } from 'react-icons/bs';

export default function SocialMedia() {
  return (
    <>
          {/* Social Media Links */}
          <div className="flex flex-row px-4 items-center gap-7 md:gap-12 flex-wrap">
        <Link href="https://www.linkedin.com/company/kh-consultation/">
          <BsLinkedin
            size={30}
            className="cursor-pointer ease-in-out duration-300"
          />
        </Link>
      </div>
    </>
  )
}
