import { CONST } from '../../Const';
import { Input } from '../input/Input';
import { Button } from '../Button/Button';
import { DroptopProps } from './Droptop.props';
import cn from 'classnames';
import './droptop.scss';

export const Droptop = ({ active, children, className, height, contentStyleActive, containerStyleActive, ...props }: DroptopProps): JSX.Element => {


	if (!contentStyleActive) {
		contentStyleActive = ''
	}

	if (!containerStyleActive) {
		containerStyleActive = ''
	}

	return (
		<div className={cn('droptop',
				{ 'droptop--active': active }, 
				{ [`${containerStyleActive}`]: active },
				className)} 
				style={{
					height
				}} {...props}>
			<div className={cn('droptop__content', 
				{ 'droptop__content--active': active }, 
				{ [`${contentStyleActive}`]: active }
				)}
				
				>
				{children}
			</div>
		</div>
	)
}