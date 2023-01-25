import {
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	ReactNode
} from 'react';


export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, 
	HTMLButtonElement> {
	appearence: 'large' | 'normal' | 'long' | 'small'
		children?: ReactNode;

	}