"use client";

import Link from "next/link";  
import AdminNavItem from "./AdminNavItem";  
import { MdDns } from "react-icons/md";  
import { usePathname } from "next/navigation";  
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import SummaryTab from "./tabs/SummaryTab";
import { Button } from "@/components/ui/button";
  
interface AdminNavProps {
  session: Session;
}  

const AdminNav: React.FC<AdminNavProps> = ({ session })  => {   
  const pathname = usePathname();   
   

  return (   
  <div className="fixed left-0 top-0 h-screen w-54 bg-black shadow-xl z-50 flex flex-col w-60 text-nowrap">   
   <div className="      
      mx-auto
      md:px-2
      px-1">  
      <div className="p-6 border-b border-gray-800">  
      <Link href="/admin">  
      <span className="text-white text-xl font-semibold">Admin Dashboard</span>  
      </Link>  
    </div>  
  
    <div className="flex flex-col items-start md:justify-center p-4 gap-8 md:gap-12 overflow-x-auto flex-nowrap">   
     <SummaryTab />
     <AdminNavItem   
      label="Manage Team"   
      icon={MdDns}   
      href="/admin/manage-team"  
      selected={pathname === "/admin/manage-team"}   
     />   
     <AdminNavItem   
      label="About Our Services"   
      icon={MdDns}   
      href="/admin/about-services"   
      selected={pathname === "/admin/about-services"}   
     />   
     <AdminNavItem   
      label="Manage Services"   
      icon={MdDns}   
      href="/admin/manage-services"   
      selected={pathname === "/admin/manage-services"}   
     />   
      <AdminNavItem   
      label="FAQs"   
      icon={MdDns}   
      href="/admin/faq"   
      selected={pathname === "/admin/faq"}   
     />   
      {/* Sign Out Button */}
      {session && (
        <Button
          className="mt-auto bg-red-500 hover:bg-red-700 text-white font-bold w-full"
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      )}
    </div>   
   </div>   
  </div>   
  );   
};  
  
  
export default AdminNav;
