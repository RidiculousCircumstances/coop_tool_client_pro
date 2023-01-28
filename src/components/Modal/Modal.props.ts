import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	active: boolean,
	coord: {x:string, y: string} | null
}