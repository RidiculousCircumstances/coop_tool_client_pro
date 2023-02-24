import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface DroptopProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	active: boolean;
	height?: string;
	contentStyleActive?: string;
	containerStyleActive?: string;
}