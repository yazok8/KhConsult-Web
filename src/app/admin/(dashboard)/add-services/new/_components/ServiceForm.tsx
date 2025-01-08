// src/app/admin/(dashboard)/services/new/page.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import DeleteButton from '@/app/admin/components/DeleteButton';

import { Service } from '@prisma/client';
import { getImageSrc } from '@/lib/imageHelper';

// Draft.js imports
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

// Our custom rich text editor
import RichTextEditor from '@/components/RichTextEditor';

type ServiceType = Service;
interface ServiceFormProps {
  service?: ServiceType | null;
}

export default function ServiceForm({ service }: ServiceFormProps) {
  type Category = 'INDIVIDUAL' | 'BUSINESS';

  const router = useRouter();

  // Ref to track if the component is mounted
  const isMounted = useRef(true);

  // Image state (File | string for existing image path)
  const [currentImageSrc, setCurrentImageSrc] = useState<File | string>('');

  // Other text inputs
  const [title, setTitle] = useState<string>(service?.title || '');
  const [category, setCategory] = useState<Category>(service?.category || 'INDIVIDUAL');

  // Draft.js rich text editor state
  const [descriptionEditorState, setDescriptionEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  // Error and submission status
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  /**
   * Effect to handle component mount and unmount
   */
  useEffect(() => {
    // Mark as mounted
    isMounted.current = true;

    // If editing and we have an imageSrc, load it
    if (service?.imageSrc) {
      const imageSrc = getImageSrc(service.imageSrc);
      setCurrentImageSrc(imageSrc);
    }

    // If we have an HTML description, convert to DraftJS EditorState
    if (service?.description) {
      const blocksFromHTML = convertFromHTML(service.description);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setDescriptionEditorState(EditorState.createWithContent(contentState));
    }

    // Cleanup function to mark as unmounted
    return () => {
      isMounted.current = false;
    };
  }, [service]);

  /**
   * Handle file input change
   */
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCurrentImageSrc(e.target.files[0]);
    }
  }

  /**
   * On submit, convert the EditorState to HTML, pass it
   * (along with other fields) to your API.
   */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    // Convert Draft.js state to HTML
    let descriptionHTML = '';
    if (descriptionEditorState) {
      const raw = convertToRaw(descriptionEditorState.getCurrentContent());
      descriptionHTML = draftToHtml(raw);
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', descriptionHTML);
    formData.append('category', category);

    // Handle file or existing image path
    if (typeof currentImageSrc === 'object' && currentImageSrc instanceof File) {
      formData.append('image', currentImageSrc);
    } else if (service && typeof currentImageSrc === 'string') {
      // If editing and not changing the image, send existing imageSrc
      formData.append('imageSrc', service.imageSrc);
    }

    const apiEndpoint = service
      ? `/api/services/editService/${service.id}`
      : '/api/services/addService';

    try {
      const res = await fetch(apiEndpoint, {
        method: service ? 'PUT' : 'POST',
        body: formData,
      });

      if (res.ok) {
        if (isMounted.current) {
          router.push('/admin/manage-services');
        }
      } else {
        const errorData = await res.json();
        console.error('Failed to save service:', errorData.error);
        if (isMounted.current) {
          setError(errorData.error || 'Failed to save service.');
        }
      }
    } catch (err) {
      console.error('An unexpected error occurred:', err);
      if (isMounted.current) {
        setError('An unexpected error occurred.');
      }
    } finally {
      if (isMounted.current) {
        setIsSubmitting(false);
      }
    }
  }

  /**
   * Handle Image onError to fallback to a default image
   */
  function handleImageError() {
    if (isMounted.current && service?.imageSrc) {
      const sanitizedImagePath = service.imageSrc.startsWith('/')
        ? service.imageSrc.slice(1)
        : service.imageSrc;
      const localImageUrl = `/services/${sanitizedImagePath}`;
      setCurrentImageSrc(localImageUrl);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {service ? 'Edit Service' : 'Create A New Service'}
        </CardTitle>
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

          {/* Description (Rich Text) */}
          <div className="py-5 space-y-2 flex flex-col">
            <Label htmlFor="description">Description</Label>
            <RichTextEditor
              editorState={descriptionEditorState}
              onEditorStateChange={setDescriptionEditorState}
            />
          </div>

          {/* File Input */}
          <div className="space-y-2">
            <Label htmlFor="image">Image (File)</Label>
            <Input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              required={!service}
              onChange={handleFileChange}
            />
          </div>

          {/* Existing Image Preview (only if editing and image is a string) */}
          {service != null &&
            typeof currentImageSrc === 'string' &&
            currentImageSrc !== '' && (
              <div className="my-4">
                <Image
                  src={
                    currentImageSrc.startsWith('http')
                      ? currentImageSrc
                      : `${currentImageSrc}`
                  }
                  height={400}
                  width={400}
                  alt="Service Image"
                  className="rounded-lg"
                  onError={handleImageError}
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

          {/* Submit & Delete Buttons */}
          <div className="flex items-center gap-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
            {service && (
              <DeleteButton
                apiEndpoint={`/api/services/deleteService/${service.id}`}
                itemId={service.id}
                confirmMessage="Are you sure you want to delete this Service?"
                successMessage="Service deleted successfully!"
                errorMessage="Failed to delete this Service."
                redirectPath="/admin/manage-services"
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
