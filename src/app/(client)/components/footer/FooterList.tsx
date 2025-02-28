import { twMerge } from "tailwind-merge";

interface FooterListProps {
    children: React.ReactNode;
    className?:string;
  }
  
  const FooterList: React.FC<FooterListProps> = ({ children, className }) => {
    return (
      <div
        className={twMerge('w-full mb-6 flex flex-col gap-2 pl-2 md:pl-0',className)
        }
      >
        {children}
      </div>
    );
  };
  
  export default FooterList;
  