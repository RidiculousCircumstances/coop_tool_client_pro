import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';

export const Input = forwardRef(
	(
		{ error, ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement>,
	): JSX.Element => {

		return (
			<div className='input' >
				<input ref={ref}  {...props} />
				{error && <span className='input__error'></span>}
			</div>
		);
	},
);
