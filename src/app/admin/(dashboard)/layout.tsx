import React from 'react';  
import AdminHeader from '../components/AdminNav';  
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
  
interface AdminLayoutProps {  
  children: React.ReactNode;  
}  
  
export default async function AdminDashboardLayout({ children }: AdminLayoutProps) { 
  const session = await getServerSession(authOptions);

  // If no session, redirect to sign-in
  if (!session) {
    redirect("/admin/auth/sign-in");
  }

  // If user is not an admin (or VIEW_ONLY), redirect to 403
  if (session.user.role !== "ADMIN" && session.user.role !== "VIEW_ONLY") {
    redirect("/403");
  } 
  
console.log(session?.user.role)

  return (  
   <>  
    <AdminHeader session={session} />  
    <main className='pl-0 md:pl-[180px]'>{children}</main>  
   </>  
  );  
}
