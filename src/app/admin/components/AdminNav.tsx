"use client";

import Link from "next/link";  
import AdminNavItem from "./AdminNavItem";  
import { MdDns, MdLibraryAdd } from "react-icons/md";  
import { usePathname } from "next/navigation";  

// import { signOut, useSession } from "next-auth/react";  
// import { Button } from "@/components/ui/button";  
import SummaryTab from "./tabs/SummaryTab";
  
  
const AdminNav = () => {   
  const pathname = usePathname();   
  /** const { data: session, status } = useSession();  */  
   
  // if (status === "loading") {   
  //  return <div>Loading...</div>;   
  // }   
   
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
      icon={MdLibraryAdd}   
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
     {/* Render additional tabs from context */}   
     {/* {session && (   
      <Button   
       className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"   
       onClick={() => signOut()}   
      >   
       Sign Out   
      </Button>   
     )}  */}  
    </div>   
   </div>   
  </div>   
  );   
};  
  
  
export default AdminNav;
