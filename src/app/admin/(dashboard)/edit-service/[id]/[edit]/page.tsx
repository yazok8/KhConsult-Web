"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from "next/image";

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();

  // Basic text fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(''); 
  const [category, setCategory] = useState('');

  // For your file input
  const [imageFile, setImageFile] = useState<File | null>(null);

  // If you want to store existing image URL (from DB) separately:
  const [existingImageUrl, setExistingImageUrl] = useState('');

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/services/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setCategory(data.category);
        // Store the existing image URL in state 
        setExistingImageUrl(data.imageSrc);
      }
    })();
  }, [params.id]);

  // Example: Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // If you're sending an imageFile to the server, you'd use FormData.
    // E.g.:
    /*
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    // fetch with multipart/form-data
    const res = await fetch(`/api/services/${params.id}`, {
      method: 'PUT',
      body: formData,
    });
    */
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Service</CardTitle>
      </CardHeader>
      <CardContent>
      <form onSubmit={handleSubmit}>
        <div className='py-5'>
          <Label>Title</Label>
          <Input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            required 
          />
        </div>

        <div className='py-5 flex flex-col'>
          <Label>Description</Label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="border-solid border-5"
            required
          />
        </div>

        {/* <div className='py-5'>
          <Label>Existing Image</Label>
          {existingImageUrl && (
            <Image 
              src={existingImageUrl}
              alt="Current Service Image"
              style={{ maxWidth: 200 }}
            />
          )}
        </div> */}

        <div className='py-5'>
          <Label>Upload New Image</Label>
          <Input
            type='file'
            onChange={e => {
              if (e.target.files && e.target.files.length > 0) {
                setImageFile(e.target.files[0]);
              }
            }}
          />
        </div>

        <div className="py-5">
          <Label>Category</Label>
          <select 
            value={category} 
            onChange={e => setCategory(e.target.value)}
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
