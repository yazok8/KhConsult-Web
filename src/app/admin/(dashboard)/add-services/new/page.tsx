// src/app/admin/(dashboard)/services/new/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function NewServicePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [category, setCategory] = useState('INDIVIDUAL');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/services', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, imageSrc, category }),
    });
    if (res.ok) {
      router.push('/admin/services');
    } else {
      // handle errors
      console.error('Failed to create service');
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create A New Service</CardTitle>
      </CardHeader>
      <CardContent>
      <form onSubmit={handleSubmit}>
        <div className='py-5'>
        <Label>Title</Label>
        <Input value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
      <div className='py-5 flex flex-col'>
        <Label>Description</Label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} className="border-solid border-5" required />
      </div>
      <div className='py-5'>
        <Label>Image URL</Label>
        <Input value={imageSrc} onChange={e => setImageSrc(e.target.value)} type='file' id='new-image' name='newImage' />
      </div>
      <div className="py-5">
        <Label>Category</Label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="INDIVIDUAL">Individual</option>
          <option value="BUSINESS">Business</option>
        </select>
      </div>
        <Button type="submit">Save</Button>
      </form>
      </CardContent>
      
    </Card>
  );
}
