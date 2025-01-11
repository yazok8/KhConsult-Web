// AdminNavItem.tsx
import Link from 'next/link';  
import { IconType } from "react-icons";  
import { MdClose } from "react-icons/md";  

interface AdminNavItemProps {  
  selected?: boolean;  
  icon: IconType;  
  label: string;  
  href: string;   
  onClose?: () => void;  
  onClick?: () => void; // Ensure onClick is an optional function
}  

const AdminNavItem: React.FC<AdminNavItemProps> = ({  
  selected,  
  icon: Icon,  
  label,  
  href,  
  onClose,  
  onClick, // Destructure onClick
}) => {  
  return (  
    <Link href={href}>  
      <div  
        onClick={onClick} // Attach the onClick handler here
        className={`flex items-center justify-center text-center gap-1 p-2 border-b-2 hover:text-slate-800 transition cursor-pointer text-white ${  
          selected  
            ? "border-b-slate-800 text-slate-800"  
            : "border-transparent text-slate-500"  
        }`}  
      >  
        <Icon size={20} fill="white"/>  
        <div className="font-medium text-sm text-center break-normal flex items-center text-white"> {/* Fixed typo here */}
          {label}  
          {onClose && (  
            <MdClose  
              size={16}  
              className="ml-2 cursor-pointer"  
              onClick={(e) => {  
                e.preventDefault();  
                e.stopPropagation();  
                onClose();  
              }}  
            />  
          )}  
        </div>  
      </div>  
    </Link>  
  );  
};  

export default AdminNavItem;
