import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface IColumnProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  id: string,
  text: string,
  isPreview?: boolean,
  children?: ReactNode,
}