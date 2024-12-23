import Link from 'next/link';  
import { IconType } from "react-icons";  
import { MdClose } from "react-icons/md";  
  
interface AdminNavItemProps {  
  selected?: boolean;  
  icon: IconType;  
  label: string;  
  href: string; // Add a href prop  
  onClose?: () => void; // Optional onClose prop  
}  
  
const AdminNavItem: React.FC<AdminNavItemProps> = ({  
  selected,  
  icon: Icon,  
  label,  
  href,  
  onClose,  
}) => {  
  return (  
   <Link href={href}>  
    <div  
      className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer text-white ${  
       selected  
        ? "border-b-slate-800 text-slate-800"  
        : "border-transparent text-slate-500"  
      }`}  
    >  
      <Icon size={20} fill="white"/>  
      <div className="font-medium text-sm text-center break-normal flex items-cneter text-white">  
       {label}  
       {onClose && (  
        <MdClose  
          size={16}  
          className="ml-2 cursor-pointer"  
          onClick={(e) => {  
           e.preventDefault();  
           e.stopPropagation();  
           onClose(); // Trigger the close action  
          }}  
        />  
       )}  
      </div>  
    </div>  
   </Link>  
  );  
};  
  
export default AdminNavItem;
