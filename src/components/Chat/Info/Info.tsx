import { observer } from 'mobx-react-lite';
import { InfoProps } from './Info.props';
import './info.scss';
import plural from 'plural-ru';
import { CONST } from '../../../Const';
import '../../../styles/app.scss';
import { RoomData } from '../../../models/Room/RoomData';
import { useContext } from 'react';
import { Context } from '../../..';
import { UsersCount } from '../usersCount/UsersCount';
import cn from 'classnames';


export const Info = observer(({className, data, ...props}: InfoProps): JSX.Element => {

	const { roomStorage, userStorage } = useContext(Context);

	const usersCount = data.users.length;

	const created_at = (new Date(data.created_at)).toLocaleDateString('ru');

	const userId = userStorage.userData?.id;


	const users = (data: RoomData): JSX.Element[] => {

		const users = data.users;
		
		return users.map((user) => {

			let isOnline = false;
			if (roomStorage.checkOnline(user.id)) {
				isOnline = true;
			}

			return (
				<div key={user.id} className={cn('info__user', { 'info__user--our': user.id === userId })}>
					<span>{user.nickname}</span>
					{isOnline &&
						<span className='info__online' />
					}
				</div>
			);
		});
	}
	
	return (
		<div className='info'>
			<div className='info__header'>
				<div className='info__room-about'>
					<div className='info__name'>{data.name}</div>
					<div className='info__flex-row-wrapper underline'>
						<UsersCount count={usersCount} />
					</div>
					<div className='info__flex-row-wrapper'>
						<span>{CONST.CREATED} </span>
						<span>{created_at}</span>
					</div>

				</div>
				<hr className='info__line'></hr>
			</div>
			

			<div className='info__buttons'>
				<div className='info__row'>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>


			<div className='info__users-container'>
				<div className='info__members'>{CONST.MEMBERS}</div>
				<div className='info__users'>
					{users(data)}
				</div>
			</div>
		</div>
		
	)
	
})