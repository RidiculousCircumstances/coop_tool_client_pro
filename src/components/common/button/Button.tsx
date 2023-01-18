import { ButtonProps } from './Button.props';
import './Button.props';


export const Button =
	(
		{ ...props }: ButtonProps,
	): JSX.Element => {
		return (
			<button className='button' {...props}></button>
		);
	};
