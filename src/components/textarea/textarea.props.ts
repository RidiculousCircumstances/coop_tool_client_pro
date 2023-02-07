import {
	DetailedHTMLProps,
	InputHTMLAttributes
} from 'react';


export interface TextareaProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLTextAreaElement>,
	HTMLTextAreaElement> {
	maxRows: number;
	minRows: number;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	value: string;
}