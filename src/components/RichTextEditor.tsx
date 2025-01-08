// components/RichTextEditor.tsx

'use client';

import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface RichTextEditorProps {
  editorState: EditorState;
  onEditorStateChange: (editorState: EditorState) => void;
}

export default function RichTextEditor({
  editorState,
  onEditorStateChange,
}: RichTextEditorProps) {
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: [
          'inline', 'blockType', 'fontSize', 'list', 'textAlign',
          'history', 'embedded', 'emoji', 'image',
        ],
      }}
    />
  );
}
