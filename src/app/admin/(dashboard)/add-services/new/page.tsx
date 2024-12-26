// src/app/admin/(dashboard)/services/new/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { getImageSrc } from '@/lib/imageHelper';
import { Service } from '@prisma/client';

type Props = {
  service?: Service;
};

export default function NewServicePage({ service }: Props) {
  const router = useRouter();

  const [currentImageSrc, setCurrentImageSrc] = useState<File | string>('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('INDIVIDUAL');

  useEffect(() => {
    if (service?.imageSrc) {
      const imageSrc = getImageSrc(service.imageSrc);
      setCurrentImageSrc(imageSrc);
    }
  }, [service]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCurrentImageSrc(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  
    const formData = new FormData();
  
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
  
    if (typeof currentImageSrc === 'object' && currentImageSrc instanceof File) {
      formData.append('image', currentImageSrc);
    } else if (typeof currentImageSrc === 'string' && currentImageSrc !== '') {
      // If editing and not changing the image, you might handle accordingly
      // For creation, ensure that image is always a File
    } else {
      // Handle cases where no image is selected if necessary
    }
  
    const res = await fetch('/api/services', {
      method: 'POST',
      // Do NOT set 'Content-Type' header manually; the browser will set it including the boundary
      body: formData,
    });
  
    if (res.ok) {
      router.push('/admin/manage-services');
    } else {
      const errorData = await res.json();
      console.error('Failed to create service:', errorData.error);
      // Optionally, set error state to display to the user
    }
  }
  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create A New Service</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="py-5 space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="py-5 space-y-2 flex flex-col">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-solid border-5"
              required
            />
          </div>

          {/* File Input */}
          <div className="space-y-2">
            <Label htmlFor="image">Image (File)</Label>
            <Input
              type="file"
              id="image"
              name="image"
              accept="image/*" // Optional: restrict to image files
              required={!service} // Only required if creating a new service
              onChange={handleFileChange}
            />
          </div>

          {/* Existing Image Preview (only if editing and image is a string) */}
          {service != null && typeof currentImageSrc === 'string' && currentImageSrc !== '' && (
            <div className="my-4">
              <Image
                src={currentImageSrc}
                height={400}
                width={400}
                alt="Service Image"
                onError={() => {
                  if (!service.imageSrc) return;
                  const sanitizedImagePath = service.imageSrc.startsWith('/')
                    ? service.imageSrc.slice(1)
                    : service.imageSrc;
                  const localImageUrl = `/services/${sanitizedImagePath}`;
                  setCurrentImageSrc(localImageUrl);
                }}
              />
            </div>
          )}

          {/* Category */}
          <div className="py-5 space-y-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded"
            >
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
