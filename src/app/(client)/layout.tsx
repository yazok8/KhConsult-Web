import React from 'react';  
import Header from './components/header/Header';  
import Footer from './components/footer/Footer';

  
interface ClientLayoutProps {  
  children: React.ReactNode;  
}  
  
export default function ClientLayout({ children }: ClientLayoutProps) {  
  return (  
   <>  
    <Header />  
    <main className='max-w-[1920px]'>{children}</main>  
    <Footer />
   </>  
  );  
}
