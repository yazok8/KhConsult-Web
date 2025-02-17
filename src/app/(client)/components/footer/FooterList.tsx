interface FooterListProps {
    children: React.ReactNode;
  }
  
  const FooterList: React.FC<FooterListProps> = ({ children }) => {
    return (
      <div
        className="
      w-full
      mb-6
      flex
      flex-col
      gap-2
      pl-2
      md:pl-0
      "
      >
        {children}
      </div>
    );
  };
  
  export default FooterList;
  