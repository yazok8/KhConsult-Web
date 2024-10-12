import React from 'react'
import { CiFacebook } from 'react-icons/ci'
import { FaInstagram } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
import { ImPinterest } from 'react-icons/im'

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
              <h3 className='pb-4'>Phone</h3>
              <p className='text-pink-400'>(123) 456-7890</p>
            </div>
            <div className='pb-8'>
              <h3 className='pb-4'>Email</h3>
              <p className='text-pink-400'>hello@reallygreatsite.com</p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className='mt-12 lg:mt-0'>
            <h3 className='pb-4 text-2xl'>Social</h3>
            <div className='flex justify-center lg:justify-start'>
              <div className='flex space-x-6 border-solid border-2 border-gray-200 p-4 rounded-md'>
                <FaInstagram className='text-3xl text-gray-700 hover:text-pink-400 transition' />
                <ImPinterest className='text-3xl text-gray-700 hover:text-pink-400 transition' />
                <FaX className='text-3xl text-gray-700 hover:text-pink-400 transition' />
                <CiFacebook className='text-3xl text-gray-700 hover:text-pink-400 transition' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
