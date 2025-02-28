import Container from '@/components/Container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';  
  
export default function AdminPage() {  
  return (  
   <Container className="flex justify-center items-center">  
    <Card className='border-none px-8 py-0'>
      <CardHeader>
        <CardTitle>Admin Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
     <h1 className="mb-auto"> Here you can add, edit, and delete any of your web content </h1>
      </CardContent>
    </Card>
   </Container>  
  );  
}
