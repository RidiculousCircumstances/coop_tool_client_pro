import { DetailedHTMLProps, HTMLAttributes } from 'react';


export interface ReferencedMessageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	refId: number,
	setActive?: (val: null) => void;
	type: 'send' | 'read';
}