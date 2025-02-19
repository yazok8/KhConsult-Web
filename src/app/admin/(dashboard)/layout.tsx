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

  if (!session) {
    redirect("/admin/auth/sign-in");
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "VIEW_ONLY") {
    redirect("/403");
  }

  return (
    <>
      <AdminHeader session={session} />
      <main className="p-4 pt-16 lg:pl-[250px] transition-all duration-300 min-h-screen">
        {children}
      </main>
    </>
  );
}