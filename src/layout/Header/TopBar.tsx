import { TopBarProps } from './TopBar.props'
import './topBar.scss';
import cn from 'classnames';

export const TopBar = ({className, roomList, chat, ...props }: TopBarProps): JSX.Element => {
	console.log(roomList);
	return (
		<header className={cn(className, 'top-bar')}>

			{chat &&
				<div className='top-bar__chat'>
					{chat}
				</div>
			}

			{roomList &&
				<div className='top-bar__room-list'>
					{roomList}
				</div>
			}
			
		</header>
	)
}