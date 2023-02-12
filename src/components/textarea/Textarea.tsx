
import cn from 'classnames';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { TextareaProps } from './textarea.props';
import './textarea.scss';

export const Textarea = 
	(
		{ maxRows, minRows, placeholder, onChange, value, onKeyDown, onPaste, ...props }: TextareaProps,
	): JSX.Element => {

		
		return ( 
			<ReactTextareaAutosize
				className={cn('textarea')} maxRows={maxRows} minRows={minRows} placeholder={placeholder}
				onChange={(e) => onChange(e)} value={value} onKeyDown={(e) => onKeyDown ? onKeyDown(e) : ''}
				onPaste={(e) => onPaste ? onPaste(e) : ''}
				/>
		);
	}
