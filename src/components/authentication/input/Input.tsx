import { InputProps } from './Input.props';
import '../auth.scss';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Input = forwardRef(
	(
		{ error, ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement>,
	): JSX.Element => {

		
		return ( 
			<div className={cn('auth__input', { 'auth__input--error': error })}>
		
				<input ref={ref} {...props}
						autoComplete='off' />
				</div>
		);
	},
);
