// components/RichTextEditor/RichTextEditor.tsx

"use client";

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Heading from '@tiptap/extension-heading';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Underline from '@tiptap/extension-underline';
import Blockquote from '@tiptap/extension-blockquote';
import { MenuBar } from './MenuBar';
import { Session } from "next-auth";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  session?: Session;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, session }) => {

  const isViewOnly = session?.user?.role === "VIEW_ONLY";

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disable Heading in StarterKit
        blockquote: false, // Disable Blockquote in StarterKit to reconfigure it
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-4 space-y-2',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-decimal ml-4 space-y-2',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'pl-1',
          },
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      Heading.configure({
        levels: [1, 2, 3], // Enable H1, H2, H3
        HTMLAttributes: {
          class: "font-bold", // Common class for all headings
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Underline.configure({
        HTMLAttributes: {
          class: 'underline',
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'blockquote', // Use lowercase for consistency
        },
      }),
    ],
    content: content || '',
    editable: !isViewOnly, // Make editor read-only if isViewOnly is true
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log("Editor Content Updated:", html);
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none focus:outline-none min-h-[200px] p-4',
      },
    },
  });

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className={`border border-gray-300 rounded-md ${isViewOnly ? 'bg-gray-100' : 'bg-white'}`}>
      {/* Conditionally render the MenuBar only if not in view-only mode */}
      {!isViewOnly && <MenuBar editor={editor} />}
      
      {/* Always render EditorContent, but it's read-only when isViewOnly is true */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
