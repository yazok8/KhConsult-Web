// src/app/admin/(dashboard)/teams/new/page.tsx

'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import dynamic from "next/dynamic";
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { getImageSrc } from '@/lib/imageHelper';
import { Prisma } from '@prisma/client';
import DeleteButton from '@/app/admin/components/DeleteButton';
import { mutate } from "swr";


const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});


type Team = Prisma.AboutOurTeamGetPayload<{
  select: {
    id: true;
    name: true;
    title: true;
    description: true;
    profileImage: true; // Ensure 'profileImage' is selected
  };
}>;

interface TeamFormProps {
  team?: Team | null; 
}

export default function TeamForm({ team }: TeamFormProps) {
  const router = useRouter();

   // Ref to track if the component is mounted
    const isMounted = useRef(true);

  const [currentImageSrc, setCurrentImageSrc] = useState<File | string>('');
  const [name, setName] = useState(team?.name || '');
  const [title, setTitle] = useState(team?.title || '');

  const [description, setDescription] = useState<string>(
    team?.description || ""
  );

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {

    isMounted.current = true;

    if (team?.profileImage) {
      const imageSrc = getImageSrc(team.profileImage);
      setCurrentImageSrc(imageSrc);
    }
    if (team?.description) {
      setDescription(team.description);
    }
    return () => {
      isMounted.current = false;
    };
  }, [team]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCurrentImageSrc(e.target.files[0]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  

    const formData = new FormData();
    
    formData.append('name', name);
    formData.append('title', title);
    formData.append('description', description);
  
    if (currentImageSrc instanceof File) {
      formData.append('image', currentImageSrc);
    } else if (team && typeof currentImageSrc === 'string') {
      // If editing and not changing the image, send existing profileImage
      formData.append('imageSrc', team.profileImage);
    }

    const apiEndpoint = team ? `/api/team/edit-team/${team.id}` : `/api/team/add-team`;
  
    try {
      const res = await fetch(apiEndpoint, {
        method: team ? 'PUT' : 'POST', // Use 'PUT' for edit
        body: formData,
      });
    
      if (res.ok) { 
        await mutate('/api/team');

        if(team){
          await mutate(`/api/team/${team.id}`);
        }

        if (isMounted.current) {
          router.push('/admin/manage-team');
          router.refresh();
        }
        
      } else {
        const errorData = await res.json();
        console.error('Failed to save team member profile:', errorData.error);
        if (isMounted.current) {
          setError(errorData.error || 'Failed to save team member profile.');
        }
      }
    }catch(err){
      console.error("An unexpected error occurred:", err);
      if (isMounted.current) {
        setError("An unexpected error occurred.");
      }
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
      }
    }
    
  }

  return (
    <Card className="mt-20 border-none">
      <CardHeader>
        <CardTitle>{team ? 'Edit Team Member' : 'Add A New Team Member'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="py-5 space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Title Field */}
          <div className="py-5 space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description Field */}
          <div className="py-5 space-y-2 flex flex-col">
            <Label htmlFor="description">Description</Label>
            <RichTextEditor
                                content={description}
                                onChange={setDescription}
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
              required={!team} // Only required if creating a new team member
              onChange={handleFileChange}
            />
          </div>

          {/* Existing Image Preview (only if editing and image is a string) */}
          {team && typeof currentImageSrc === 'string' && currentImageSrc !== '' && (  
            <div className="my-4">  
              <Image  
                src={currentImageSrc.startsWith('http') ? currentImageSrc : `https://khconsult.s3.us-east-2.amazonaws.com/${currentImageSrc}`}  
                height={400}  
                width={400}  
                alt="Team Member Image"  
                onError={() => {  
                  if (!team.profileImage) return;  
                  const sanitizedImagePath = team.profileImage.startsWith('/') 
                    ? team.profileImage.slice(1)  
                    : team.profileImage;  
                  const localImageUrl = `/teams/${sanitizedImagePath}`;  
                  setCurrentImageSrc(localImageUrl);  
                }}  
              />  
            </div>  
          )}  

          {/* Display Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex items-center gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
            {team && (
              <DeleteButton
                apiEndpoint={`/api/team/delete-team/${team.id}`}
                itemId={team.id}
                confirmMessage="Are you sure you want to delete this team member?"
                successMessage="Team member deleted successfully!"
                errorMessage="Failed to delete this team member."
                redirectPath="/admin/manage-team" // Dynamic redirect path
                variant="destructive"
                buttonText="Delete"
              />
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
