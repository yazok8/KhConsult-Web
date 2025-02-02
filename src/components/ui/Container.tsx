import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = '', id }) => {
  return (
    <div
      id={id}
      className={`container-modern ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;