import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ImagesProps extends DetailedHTMLProps<HTMLAttributes<ImagesProps>, ImagesProps> {
	paths: string[];
}