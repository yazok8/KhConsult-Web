// components/DeleteButton.tsx

"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // Show confirmation prompt
    const confirmed = window.confirm(confirmMessage);
    if (!confirmed) return;

    setIsDeleting(true);

    try {
      const res = await fetch(apiEndpoint, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success(successMessage);
        onSuccess?.(); // Optional chaining
        
        setTimeout(() => {
            router.push("/admin/faq");
        }, 2000);
      } else {
        const errorData = await res.json();
        const msg = errorData.err || errorMessage;
        toast.error(msg);
        onError?.(); // Optional chaining
      }
    } catch (error) {
      console.error("Delete operation failed:", error);
      toast.error(errorMessage);
      onError?.(); // Optional chaining
    } finally {
      setIsDeleting(false);
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
