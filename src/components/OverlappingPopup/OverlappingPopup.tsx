
import { OverlappingPopupProps } from './OverlappingPopup.props';
import cn from 'classnames';
import './overlappingPopup.scss';

export const OverlappingPopup = ({ active, setActive, className, children, ...props }: OverlappingPopupProps): JSX.Element => {

	const showOffHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		setActive(false);
	}

	return (
		<div className={cn(className, 'overlappingPopup',
			 {'overlappingPopup--active': active})}
			onClick={(e) => showOffHandler(e)}
			{...props}>
			<div className='overlappingPopup__content' onClick={(e) => e.stopPropagation()}>
				{children}
			</div>

		</div>
	)
}