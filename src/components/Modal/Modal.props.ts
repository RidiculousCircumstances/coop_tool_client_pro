import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	type: 'newChat' | 'joinChat',
	active: boolean,
	setActive: CallableFunction;
}