// components/RichTextEditor/MenuBar.tsx

import React from "react";
import { Editor } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
  ListBulletedIcon,
  ListNumberedIcon,
  LinkIcon,
  ImageIcon,
  UndoIcon,
  RedoIcon,
} from "./icons" // Adjust the path as necessary

interface MenuBarProps {
  editor: Editor;
}

export const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap mb-4 space-x-1 bg-gray-100 dark:bg-gray-800 p-2 rounded-md shadow">
      {/* Inline Styles */}
      <div className="flex space-x-1 mr-4">
        <button
          type="button"
          onClick={() => {
            console.log("Toggling Bold");
            editor.chain().focus().toggleBold().run();
          }}
          className={`p-2 rounded ${
            editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700"
          }`}
          aria-label="Bold"
          title="Bold"
        >
          <BoldIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            console.log("Toggling Italic");
            editor.chain().focus().toggleItalic().run();
          }}
          className={`p-2 rounded ${
            editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700"
          }`}
          aria-label="Italic"
          title="Italic"
        >
          <ItalicIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            console.log("Toggling Underline");
            editor.chain().focus().toggleUnderline().run();
          }}
          className={`p-2 rounded ${
            editor.isActive("underline") ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700"
          }`}
          aria-label="Underline"
          title="Underline"
        >
          <UnderlineIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            console.log("Toggling Strikethrough");
            editor.chain().focus().toggleStrike().run();
          }}
          className={`p-2 rounded ${
            editor.isActive("strike") ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700"
          }`}
          aria-label="Strikethrough"
          title="Strikethrough"
        >
          <StrikethroughIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            console.log("Toggling Inline Code");
            editor.chain().focus().toggleCode().run();
          }}
          className={`p-2 rounded ${
            editor.isActive("code") ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700"
          }`}
          aria-label="Inline Code"
          title="Inline Code"
        >
          <CodeIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Headings */}
      <div className="flex space-x-1 mr-4">
        <button
          type="button"
          onClick={() => {
            console.log("Toggling Heading 1");
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 1 })
              ? "bg-blue-500 text-white"
              : "bg-white dark:bg-gray-700"
          }`}
          aria-label="Heading 1"
          title="Heading 1"
        >
          <span className="font-semibold text-lg">H1</span>
        </button>
        <button
          type="button"
          onClick={() => {
            console.log("Toggling Heading 2");
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-500 text-white"
              : "bg-white dark:bg-gray-700"
          }`}
          aria-label="Heading 2"
          title="Heading 2"
        >
          <span className="font-semibold text-lg">H2</span>
        </button>
        <button
          type="button"
          onClick={() => {
            console.log("Toggling Heading 3");
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 3 })
              ? "bg-blue-500 text-white"
              : "bg-white dark:bg-gray-700"
          }`}
          aria-label="Heading 3"
          title="Heading 3"
        >
          <span className="font-semibold text-lg">H3</span>
        </button>
      </div>

      {/* Lists */}
      <div className="flex space-x-1 mr-4">
        <button
          type="button"
          onClick={() => {
            console.log("Toggling Bullet List");
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`p-2 rounded ${
            editor.isActive("bulletList") ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700"
          }`}
          aria-label="Bullet List"
          title="Bullet List"
        >
          <ListBulletedIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            console.log("Toggling Ordered List");
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={`p-2 rounded ${
            editor.isActive("orderedList") ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700"
          }`}
          aria-label="Ordered List"
          title="Ordered List"
        >
          <ListNumberedIcon className="w-5 h-5" />
        </button>
      </div>


      {/* Entities */}
      <div className="flex space-x-1 mr-4">
        <button
          type="button"
          onClick={() => {
            console.log("Adding Link");
            const url = window.prompt("Enter URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={`p-2 rounded ${
            editor.isActive("link") ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700"
          }`}
          aria-label="Link"
          title="Add Link"
        >
          <LinkIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            console.log("Adding Image");
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = async () => {
              if (input.files && input.files[0]) {
                const file = input.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                  const src = reader.result as string;
                  editor.chain().focus().setImage({ src }).run();
                };
                reader.readAsDataURL(file);
              }
            };
            input.click();
          }}
          className={`p-2 rounded ${
            editor.isActive("image") ? "bg-blue-500 text-white" : "bg-white dark:bg-gray-700"
          }`}
          aria-label="Image"
          title="Add Image"
        >
          <ImageIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Undo/Redo */}
      <div className="flex space-x-1">
        <button
          type="button"
          onClick={() => {
            console.log("Undo Action");
            editor.chain().focus().undo().run();
          }}
          className="p-2 rounded bg-white dark:bg-gray-700"
          aria-label="Undo"
          title="Undo"
        >
          <UndoIcon className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => {
            console.log("Redo Action");
            editor.chain().focus().redo().run();
          }}
          className="p-2 rounded bg-white dark:bg-gray-700"
          aria-label="Redo"
          title="Redo"
        >
          <RedoIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
