// AdminNav.tsx
"use client";

import Link from "next/link";  
import AdminNavItem from "./AdminNavItem";  
import { MdDns, MdMenu, MdClose } from "react-icons/md"; // Imported MdMenu and MdClose
import { usePathname } from "next/navigation";  
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import SummaryTab from "./tabs/SummaryTab";
import { Button } from "@/components/ui/button";
import { useState } from "react"; // Corrected import statement

interface AdminNavProps {
  session: Session;
}  

const AdminNav: React.FC<AdminNavProps> = ({ session }) => {   
  const [openNav, setOpenNav] = useState(false); // false means navbar is closed
  const pathname = usePathname();   

  const handleNavItemClick = () => {
    setOpenNav(false); // Close the navbar
  };

  const toggleNav = () => {
    setOpenNav(!openNav); // Toggle navbar visibility
  };

  return (  
    <>
      {/* Toggle Button */}
      <button 
        className="fixed top-4 left-4 z-60 text-white text-2xl bg-black p-0 md:ml-8" // Hidden on medium and larger screens
        onClick={toggleNav}
      >
        {openNav ? <MdClose /> : <MdMenu />}
      </button>

      {
        openNav && // Show navbar when openNav is true
        <div className="fixed left-0 top-0 h-full md:h-screen w-60 bg-black shadow-xl z-50 flex flex-col text-nowrap w-full md:max-w-[32%] lg:max-w-[22%]">   
          <div className="mx-auto md:px-2 px-1">  
            <div className="p-6 border-b border-gray-800 flex justify-between items-center">  
              <Button className="bg-transparent p-0" onClick={() => setOpenNav(false)}>  
                <span className="text-white text-xl font-semibold mr-4">Admin Dashboard</span>  
              </Button>
              {/* Close Button */}
              <button onClick={() => setOpenNav(false)}>
                <MdClose size={24} className="text-white" />
              </button>
            </div>  

            <div className="flex flex-col items-start md:justify-center p-4 gap-8 md:gap-12 overflow-y-auto flex-nowrap">   
              <SummaryTab />
              <AdminNavItem   
                label="Manage Team"   
                icon={MdDns}   
                href="/admin/manage-team"  
                selected={pathname === "/admin/manage-team"}   
                onClick={handleNavItemClick} // Pass the handler
              />   
              <AdminNavItem   
                label="About Our Services"   
                icon={MdDns}   
                href="/admin/about-services"   
                selected={pathname === "/admin/about-services"}   
                onClick={handleNavItemClick} // Pass the handler
              />   
              <AdminNavItem   
                label="Manage Services"   
                icon={MdDns}   
                href="/admin/manage-services"   
                selected={pathname === "/admin/manage-services"}   
                onClick={handleNavItemClick} // Pass the handler
              />   
              <AdminNavItem   
                label="FAQs"   
                icon={MdDns}   
                href="/admin/faq"   
                selected={pathname === "/admin/faq"}   
                onClick={handleNavItemClick} // Pass the handler
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
      }

      {/* Overlay to close navbar when clicking outside (optional for better UX) */}
      {openNav && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden" 
          onClick={() => setOpenNav(false)}
        ></div>
      )}
    </>
  );   
};  

export default AdminNav;
