import React from 'react'
import { CiFacebook } from 'react-icons/ci'
import { FaInstagram } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
import { ImPinterest } from 'react-icons/im'

export default function ContactPage() {
  return (
    <section id="contact"  className='text-start text-black min-h-screen pt-20 my-12 overflow-x-hidden'>
      <div className='flex flex-col justify-center mx-auto max-w-6xl'>
        <h1 className='text-5xl max-w-3xl'>Get a quote or set up a consultation.</h1>
        <div className='w-full mt-20 flex flex-col justify-center'>
            <div className='max-w-5xl text-3xl'>
            <div className='pb-8'>
            <h3 className='pb-4'>Phone</h3>
            <p className='text-pink-400'>(123) 456-7890</p>
            </div>
            <div className='pb-8'>
            <h3 className='pb-4'>Email</h3>
            <p className='text-pink-400'>hello@reallygreatsite.com</p>
            </div>
            <div>
            <h3 className='pb-4'>Social</h3>
            <div className='flex max-w-fit border-solid border-2 border-gray-200'>
                <div className='m-5 flex space-x-5'>
            <FaInstagram className='outline-none bg-white text-3xl'/>
            <ImPinterest  className='bg-white outline-none text-3xl'/>
            <FaX  className='bg-white outline-none text-3xl'/>
            <CiFacebook className='bg-white outline-none text-3xl'/>
            </div>
            </div>
            </div>
            </div>
        </div>
        </div>
    </section>
  )
}
