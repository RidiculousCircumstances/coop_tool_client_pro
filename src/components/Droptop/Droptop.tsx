import { CONST } from '../../Const';
import { Input } from '../input/Input';
import { Button } from '../Button/Button';
import { DroptopProps } from './Droptop.props';
import cn from 'classnames';
import './droptop.scss';

export const Droptop = ({ active, children, className, ...props }: DroptopProps): JSX.Element => {


	return (

		<div className={cn(className, 'droptop', { 'droptop--active': active })} {...props}>
			<div className={cn('droptop__content', { 'droptop__content--active': active })}>
				{children}
			</div>
		</div>


	)
}