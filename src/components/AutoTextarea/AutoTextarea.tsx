
import cn from 'classnames';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { AutoTextareaProps } from './autoTextarea.props';
import './textarea.scss';

export const AutoTextarea = 
	(
		{ maxRows, minRows, placeholder, onChange, value, onKeyDown, onPaste, ...props }: AutoTextareaProps,
	): JSX.Element => {

		
		return ( 
			<ReactTextareaAutosize
				className={cn('textarea')} maxRows={maxRows} minRows={minRows} placeholder={placeholder}
				onChange={(e) => onChange(e)} value={value} onKeyDown={(e) => onKeyDown ? onKeyDown(e) : ''}
				onPaste={(e) => onPaste ? onPaste(e) : ''}
				/>
		);
	}
