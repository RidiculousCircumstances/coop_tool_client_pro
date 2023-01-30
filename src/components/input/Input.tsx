
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { InputProps } from './Input.props';
import './input.scss';

export const Input = forwardRef(
	(
		{ className, error, ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement>,
	): JSX.Element => {

		
		return ( 
			<div className={cn(className, 'input', { 'input--error': error })}>
				<input ref={ref} {...props} autoComplete='off' />
			</div>
		);
	},
);
