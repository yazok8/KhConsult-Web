// src/components/TestMenuBar.tsx

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { FaListUl, FaListOl } from "react-icons/fa";

const TestMenuBar = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Test content</p>",
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="p-2 rounded bg-white dark:bg-gray-700"
        aria-label="Bullet List"
      >
        <FaListUl className="w-5 h-5" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="p-2 rounded bg-white dark:bg-gray-700"
        aria-label="Ordered List"
      >
        <FaListOl className="w-5 h-5" />
      </button>

      <EditorContent editor={editor} />
    </div>
  );
};

export default TestMenuBar;
