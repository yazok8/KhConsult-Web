import FooterList from '@/app/(client)/components/footer/FooterList'
import { ContactForm } from '@/components/ContactForm'
import Container from '@/components/Container'
import SocialMedia from '@/components/SocialMedia'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

export default function ContactPage() {
  return (
    <Container id="contact" className='section-modern'>
      <Card className='flex flex-col justify-center mx-auto p-8 w-[1110px]'>
        <CardHeader className='md:text-5xl text-center lg:text-left max-w-3xl'>
          <CardTitle>Get a quote or set up a consultation.</CardTitle>
        </CardHeader>
        <CardContent className='w-full flex flex-col lg:flex-row justify-between'>
        
          {/* Contact Information */}
          <ContactForm />

          <div className='text-lg md:text-2xl'>
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
        
        </CardContent>
      </Card>
    </Container>
  )
}
