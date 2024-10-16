import React from 'react';

interface ContainerProps {
    children: React.ReactNode;
    id?:string
  }
  

export default function Container({children,id}:ContainerProps) {
  return (
    <section id={id} className='flex justify-center min-h-screen lg:max-w-6xl flex-wrap mx-auto px-5 pt-20'>{children}</section>
  )
}
