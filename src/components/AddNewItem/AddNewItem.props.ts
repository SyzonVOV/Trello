// import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
// extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export interface IAddNewItemProps {
  onAdd(text: string): void
  toggleButtonText: string
  dark?: boolean
}