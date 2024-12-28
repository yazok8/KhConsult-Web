'use client';  
  
import AdminNavItem from '../AdminNavItem';  
import { MdDashboard } from 'react-icons/md';  
  
export default function SummaryTab() {  
  return (  
   <AdminNavItem label="Client View" icon={MdDashboard} href="/admin/summary" />  
  );  
}
