import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface NotifyPopupProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	active: boolean,
}