// src/components/Icons.tsx

import React from 'react';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaCode,
  FaHeading,
  FaListUl,
  FaListOl,
  FaLink,
  FaImage,
  FaUndo,
  FaRedo,
  FaCodeBranch,
} from 'react-icons/fa'; // Import from Font Awesome

// Wrapper components
export const BoldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <FaBold {...props} />
);

export const ItalicIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <FaItalic {...props} />
);

export const UnderlineIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <FaUnderline {...props} />
);

export const StrikethroughIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <FaStrikethrough {...props} />
);

export const CodeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <FaCode {...props} />
);

// New Code Block Icon
export const CodeBlockIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <FaCodeBranch {...props} />
);

export const HeadingIcon: React.FC<{ level: number } & React.SVGProps<SVGSVGElement>> = ({
  ...props
}) => (
  <FaHeading {...props} />
);

export const ListBulletedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <FaListUl {...props} />
);

export const ListNumberedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <FaListOl {...props} />
);


export const LinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <FaLink {...props} />
);

export const ImageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <FaImage {...props} />
);

export const UndoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <FaUndo {...props} />
);

export const RedoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <FaRedo {...props} />
);

// Add more icons as needed
