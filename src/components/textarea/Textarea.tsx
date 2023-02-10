
import cn from 'classnames';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { TextareaProps } from './textarea.props';

export const Textarea = 
	(
		{ maxRows, minRows, placeholder, onChange, value, onKeyDown, onPaste, ...props }: TextareaProps,
	): JSX.Element => {

		
		return ( 
			<ReactTextareaAutosize style={{
				width: 430,
				resize: 'none',
				background: 'none',
				borderRadius: '8px',
				outline: 'none',
				border: '1px solid #5c365e',
				padding: '6px 10px',
				color: '#8b8686'

			}} className={cn('textarea')} maxRows={maxRows} minRows={minRows} placeholder={placeholder}
				onChange={(e) => onChange(e)} value={value} onKeyDown={(e) => onKeyDown ? onKeyDown(e) : ''}
				onPaste={(e) => onPaste ? onPaste(e) : ''}
				/>
		);
	}
