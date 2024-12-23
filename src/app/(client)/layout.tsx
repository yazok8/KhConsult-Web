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
    <main>{children}</main>  
    <Footer />
   </>  
  );  
}
