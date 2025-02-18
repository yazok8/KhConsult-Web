import FooterList from '@/app/(client)/components/footer/FooterList'
import { ContactForm } from '@/components/ContactForm'
import SocialMedia from '@/components/SocialMedia'
import React from 'react'

export default function ContactPage() {
  return (
    <section id="contact" className='text-start text-white min-h-screen pt-20 overflow-x-hidden px-5'>
      <div className='flex flex-col justify-center mx-auto max-w-6xl'>
        <h1 className='md:text-5xl text-center lg:text-left max-w-3xl mb-12'>
          Get a quote or set up a consultation.
        </h1>
        <div className='w-full flex flex-col lg:flex-row justify-between mt-12'>
          {/* Contact Information */}
          <ContactForm />

          <div className='max-w-5xl text-lg md:text-2xl'>
            <div className='pb-8'>
              <h3 className='pb-4 font-bold text-base'>Email</h3>
              <p>info@khconsult.com</p>
            </div>
                      {/* Social Media Icons */}
          <div className='mt-12 lg:mt-0'>
            <FooterList>
            <h3 className="text-base font-bold mb-2 text-nowrap">Follow Us</h3>
            <SocialMedia/>
          </FooterList>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
