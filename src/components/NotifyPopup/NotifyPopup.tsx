import cn from 'classnames';
import { NotifyPopupProps } from './NotifyPopup.props';
import './notifyPopup.scss';

export const NotifyPopup = ({ active, className, children, ...props }: NotifyPopupProps): JSX.Element => {

	return (
		<div className={cn(className, 'notifyPopup', {'notifyPopup--active': active})} 
			{...props}>
			<div className='notifyPopup__container'>
				{children}
			</div>
		</div>
	)
}