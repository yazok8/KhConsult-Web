import React from 'react';  
import AdminHeader from './components/AdminNav';  
  
interface AdminLayoutProps {  
  children: React.ReactNode;  
}  
  
export default function AdminDashboardLayout({ children }: AdminLayoutProps) {  
  return (  
   <>  
    <AdminHeader />  
    <main className='pl-[250px]'>{children}</main>  
   </>  
  );  
}
