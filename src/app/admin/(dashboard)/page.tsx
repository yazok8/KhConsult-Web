import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';  
  
export default function AdminPage() {  
  return (  
   <div className="admin-dashboard mt-[30%]">  
    <Card className='border-none'>
      <CardHeader>
        <CardTitle>Admin Dashboard</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
     <h1 className="mb-auto"> Here you can add, edit, and delete any of your web content </h1>
      </CardContent>
    </Card>
   </div>  
  );  
}
