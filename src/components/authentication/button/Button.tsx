import { ButtonProps } from './Button.props';
import '../auth.scss';


export const Button =
	(
		{ ...props }: ButtonProps,
	): JSX.Element => {
		return (
			<button className='auth__button' {...props}></button>
		);
	};
