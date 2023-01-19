import { InputProps } from './Input.props';
import '../auth.scss';

import { ForwardedRef, forwardRef } from 'react';

export const Input = forwardRef(
	(
		{ error, ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement>,
	): JSX.Element => {

		return (
			<div className='auth__input' >
				<input ref={ref}  {...props} />
				{error && <span className='input__error'></span>}
			</div>
		);
	},
);
