import FooterList from '@/app/components/footer/FooterList'
import Link from 'next/link'
import React from 'react'
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from 'react-icons/ai'
import { MdFacebook } from 'react-icons/md'

export default function ContactPage() {
  return (
    <section id="contact" className='text-start text-black min-h-screen pt-20 overflow-x-hidden px-5'>
      <div className='flex flex-col justify-center mx-auto max-w-6xl'>
        <h1 className='text-4xl md:text-5xl text-center lg:text-left max-w-3xl mb-12'>
          Get a quote or set up a consultation.
        </h1>

        <div className='w-full flex flex-col lg:flex-row justify-between mt-12'>
          {/* Contact Information */}
          <div className='max-w-5xl text-lg md:text-2xl'>
            <div className='pb-8'>
              <h3 className='pb-4 font-bold text-base'>Phone</h3>
              <p className='text-pink-400'>(123) 456-7890</p>
            </div>
            <div className='pb-8'>
              <h3 className='pb-4 font-bold text-base'>Email</h3>
              <p className='text-pink-400'>hello@reallygreatsite.com</p>
            </div>
                      {/* Social Media Icons */}
          <div className='mt-12 lg:mt-0'>
            <FooterList>
            <h3 className="text-base font-bold mb-2 text-nowrap">Follow Us</h3>
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
        </div>
      </div>
    </section>
  )
}
