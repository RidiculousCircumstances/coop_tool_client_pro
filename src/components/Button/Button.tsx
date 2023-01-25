import { ButtonProps } from './Button.props';
import './button.scss';
import cn from 'classnames';


export const Button =
	(
		{ className, appearence,  ...props }: ButtonProps,
	): JSX.Element => {
		return (
			<button className={cn(className, 'button', 
				{ 'button--large': appearence  === 'large'},
				{ 'button--normal': appearence === 'normal' },
				{ 'button--small': appearence === 'small' },
				{ 'button--long': appearence === 'long' }
				)} {...props}></button>
		);
	};
