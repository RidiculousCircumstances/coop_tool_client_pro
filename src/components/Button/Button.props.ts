import {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	ReactNode
} from 'react';


export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, 
	HTMLButtonElement> {
		appearence: 'large' | 'small' | 'long'
		children?: ReactNode;

	}