import { DetailedHTMLProps, FunctionComponent, HTMLAttributes, ReactNode } from 'react';

export interface TopBarProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> { 
		roomList?: ReactNode;
		chat?: ReactNode;
	}
