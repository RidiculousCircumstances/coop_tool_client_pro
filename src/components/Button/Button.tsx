import { ButtonProps } from './Button.props';
import './button.scss';
import cn from 'classnames';


export const Button =
	(
		{ className, ...props }: ButtonProps,
	): JSX.Element => {
		return (
			<button className={cn(className, 'button')} {...props}></button>
		);
	};
