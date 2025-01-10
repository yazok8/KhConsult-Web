// types/tiptap.d.ts

import '@tiptap/core';
import { LinkOptions } from '@tiptap/extension-link';
import { ImageOptions } from '@tiptap/extension-image';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    /**
     * Link-related commands
     */
    link: {
      /**
       * Set a link with the given attributes
       */
      setLink: (attributes: LinkOptions) => ReturnType;
      /**
       * Toggle a link with the given attributes
       */
      toggleLink: (attributes: LinkOptions) => ReturnType;
      /**
       * Unset a link
       */
      unsetLink: () => ReturnType;
    };

    /**
     * Image-related commands
     */
    image: {
      /**
       * Set an image with the given attributes
       */
      setImage: (attributes: ImageOptions) => ReturnType;
      /**
       * Update an image with the given attributes
       */
      updateImage: (attributes: ImageOptions) => ReturnType;
      /**
       * Delete an image
       */
      deleteImage: () => ReturnType;
    };

    /**
     * Underline-related commands
     */
    underline: {
      /**
       * Toggle underline
       */
      toggleUnderline: () => ReturnType;
      /**
       * Set underline
       */
      setUnderline: () => ReturnType;
      /**
       * Unset underline
       */
      unsetUnderline: () => ReturnType;
    };

    /**
     * Blockquote-related commands
     */
    blockquote: {
      /**
       * Toggle blockquote
       */
      toggleBlockquote: () => ReturnType;
      /**
       * Set blockquote
       */
      setBlockquote: () => ReturnType;
      /**
       * Unset blockquote
       */
      unsetBlockquote: () => ReturnType;
    };

    /**
     * CodeBlock-related commands
     */
    codeBlock: {
      /**
       * Toggle code block
       */
      toggleCodeBlock: () => ReturnType;
      /**
       * Set code block
       */
      setCodeBlock: () => ReturnType;
      /**
       * Unset code block
       */
      unsetCodeBlock: () => ReturnType;
    };
  }
}
