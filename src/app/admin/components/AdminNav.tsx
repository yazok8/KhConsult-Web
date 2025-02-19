"use client";

import AdminNavItem from "./AdminNavItem";  
import { MdDns, MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { usePathname } from "next/navigation";  
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import SummaryTab from "./tabs/SummaryTab";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';

interface AdminNavProps {
  session: Session;
}  

const AdminNav: React.FC<AdminNavProps> = ({ session }) => {   
  const router = useRouter();
  const [openNav, setOpenNav] = useState(false);
  const pathname = usePathname();   
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleNavItemClick = () => {
    setOpenNav(false);
  };

  const toggleNav = () => {
    setOpenNav(!openNav);
  };

  const handleSignOut = async () => {
    await signOut({ 
      redirect: false 
    });
    router.replace('/admin/signin');
  };

  // Close sidebar on route change
  useEffect(() => {
    setOpenNav(false);
  }, [pathname]);

  // Handle clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setOpenNav(false);
      }
    };
  
    if (openNav) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when sidebar is open
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore scrolling when sidebar is closed
      document.body.style.overflow = 'auto';
    }
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [openNav]);
  
  return (  
    <>
      {/* Navigation button - visible on all screen sizes */}
      <button 
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white md:ml-4 hover:bg-gray-700 transition-colors lg:hidden"
        onClick={toggleNav}
        aria-label="Toggle navigation"
      >
        {openNav ? <MdClose size={24} /> : <GiHamburgerMenu size={24} />}
      </button>

      {/* Large screen persistent sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-screen bg-black shadow-xl z-40 w-[250px]">
        <div className="p-6 border-b border-gray-800">
          <span className="text-white text-xl font-semibold">Admin Dashboard</span>
        </div>
        <div className="flex flex-col p-4 gap-8 overflow-y-auto">
          <SummaryTab />
          <AdminNavItem
            label="About Our Services"
            icon={MdDns}
            href="/admin/about-services"
            selected={pathname === "/admin/about-services"}
          />
          <AdminNavItem
            label="Manage Team"
            icon={MdDns}
            href="/admin/manage-team"
            selected={pathname === "/admin/manage-team"}
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
          {session && (
            <Button
              className="mt-auto bg-red-500 hover:bg-red-700 text-white font-bold w-full"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          )}
        </div>
      </div>

      {/* Mobile/tablet sliding sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-screen bg-black shadow-xl z-50 flex flex-col
                  xs:w-[70%] lg:hidden
                   transform transition-transform duration-300 ease-in-out
                   ${openNav ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 border-b border-gray-800 flex justify-between">
          <span className="text-white text-xl font-semibold">Admin Dashboard</span>
          <button 
            onClick={() => setOpenNav(false)}
            aria-label="Close navigation"
          >
            <MdClose size={24} className="text-white" />
          </button>
        </div>

        <div className="flex flex-col p-4 gap-8 overflow-y-auto">
          <SummaryTab />
          <AdminNavItem
            label="About Our Services"
            icon={MdDns}
            href="/admin/about-services"
            selected={pathname === "/admin/about-services"}
            onClick={handleNavItemClick}
          />
          <AdminNavItem
            label="Manage Team"
            icon={MdDns}
            href="/admin/manage-team"
            selected={pathname === "/admin/manage-team"}
            onClick={handleNavItemClick}
          />
          <AdminNavItem
            label="Manage Services"
            icon={MdDns}
            href="/admin/manage-services"
            selected={pathname === "/admin/manage-services"}
            onClick={handleNavItemClick}
          />
          <AdminNavItem
            label="FAQs"
            icon={MdDns}
            href="/admin/faq"
            selected={pathname === "/admin/faq"}
            onClick={handleNavItemClick}
          />
          {session && (
            <Button
              className="mt-auto bg-red-500 hover:bg-red-700 text-white font-bold w-full"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          )}
        </div>
      </div>

      {/* Overlay for mobile/tablet */}
      {openNav && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setOpenNav(false)}
          aria-hidden="true"
        ></div>
      )}
    </>
  );   
};  

export default AdminNav;