import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface OverlappingPopupProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	active: boolean,
	setActive: CallableFunction,
}