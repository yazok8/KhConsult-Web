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
import { Prisma } from '@prisma/client';

type Service = Prisma.ServiceGetPayload<object>;

interface ServiceFormProps {
    service?: Service | null; 
}

export default function ServiceForm({ service }: ServiceFormProps) {

type Category = 'INDIVIDUAL' | 'BUSINESS'; 

  const router = useRouter();

  const [currentImageSrc, setCurrentImageSrc] = useState<File | string>('');

  const [title, setTitle] = useState(service?.title || '');
  const [description, setDescription] = useState(service?.description || '');
  const [category, setCategory] = useState(service?.category || 'INDIVIDUAL');

  const [error, setError] = useState<string | null>(null);

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
    } else if (service && typeof currentImageSrc === 'string') {
      // If editing and not changing the image, send existing imageSrc
      formData.append('imageSrc', service.imageSrc);
    }

    const apiEndpoint = service ? `/api/services/editService/${service.id}` : '/api/services/addService';
  
    const res = await fetch(apiEndpoint, {
      method: service ? 'PUT' : 'POST', // Use 'PUT' for edit
      body: formData,
    });
  
    if (res.ok) { 
      router.push('/admin/manage-services');
    } else {
      const errorData = await res.json();
      console.error('Failed to save service:', errorData.error);
      setError(errorData.error || 'Failed to save service.');
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{service ? 'Edit Service' : 'Create A New Service'}</CardTitle>
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
                src={currentImageSrc.startsWith('http') ? currentImageSrc : `${currentImageSrc}`}  
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
              onChange={(e) => setCategory(e.target.value as Category)}
              className="block w-full p-2 border border-gray-300 rounded"
            >
              <option value="INDIVIDUAL">Individual</option>
              <option value="BUSINESS">Business</option>
            </select>
          </div>

          {/* Display Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit">Save</Button>
        </form>
      </CardContent>
    </Card>
  );
}
