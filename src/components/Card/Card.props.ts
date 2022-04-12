import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface ICardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string
  text: string;
  columnId: string;
  isPreview?: boolean
  children?: ReactNode;
}