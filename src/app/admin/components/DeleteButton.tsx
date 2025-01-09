// src/app/admin/components/DeleteButton.tsx

"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useIsMounted } from "@/app/hooks/useIsMounted"; // Import the hook

interface DeleteButtonProps {
  apiEndpoint: string;
  itemId: string;
  confirmMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  onError?: () => void;
  variant?: "default" | "destructive" | "outline" | "ghost" | "link";
  buttonText?: string;
  redirectPath?: string; // New optional prop
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  apiEndpoint,
  itemId,
  confirmMessage = "Are you sure you want to delete this item?",
  successMessage = "Item deleted successfully!",
  errorMessage = "Failed to delete the item.",
  onSuccess,
  onError,
  variant = "destructive",
  buttonText = "Delete",
  redirectPath, // Destructure the new prop
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const isMounted = useIsMounted(); // Use the custom hook
  const abortControllerRef = useRef<AbortController | null>(null); // Track AbortController
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // Track setTimeout

  useEffect(() => {
    console.log("DeleteButton mounted");

    return () => {
      console.log("DeleteButton unmounted");
      if (abortControllerRef.current) {
        abortControllerRef.current.abort(); // Abort ongoing fetch on unmount
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Clear any pending timeouts
      }
    };
  }, []);

  const handleDelete = async () => {
    // Show confirmation prompt
    const confirmed = window.confirm(confirmMessage);
    if (!confirmed) return;

    if (!isMounted.current) return; // Ensure component is still mounted
    setIsDeleting(true);

    const controller = new AbortController();
    abortControllerRef.current = controller; // Store the controller

    try {
      const res = await fetch(apiEndpoint, {
        method: "DELETE",
        signal: controller.signal, // Attach the signal here
      });

      if (!isMounted.current) return; // Prevent further actions if unmounted

      if (res.ok) {
        toast.success(successMessage);
        onSuccess?.(); // Optional chaining

        if (redirectPath) {
          timeoutRef.current = setTimeout(() => {
            if (isMounted.current) {
              router.push(redirectPath); // Redirect after 2 seconds
            }
          }, 2000);
        } else {
          // Optionally, refresh the current page
          timeoutRef.current = setTimeout(() => {
            if (isMounted.current) {
              router.refresh();
            }
          }, 2000);
        }
      } else {
        const errorData = await res.json();
        const msg = errorData.err || errorMessage;
        toast.error(msg);
        onError?.(); // Optional chaining
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        console.log("Delete fetch aborted");
        // Optionally, handle abort differently
      } else {
        console.error("Delete operation failed:", error);
        if (isMounted.current) {
          toast.error(errorMessage);
          onError?.(); // Optional chaining
        }
      }
    } finally {
      if (isMounted.current) {
        setIsDeleting(false); // Reset deleting state
      }
      abortControllerRef.current = null; // Clean up the controller
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleDelete}
      disabled={isDeleting}
      className="flex items-center"
    >
      {isDeleting ? "Deleting..." : buttonText}
    </Button>
  );
};

export default DeleteButton;
