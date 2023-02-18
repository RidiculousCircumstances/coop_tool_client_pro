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


export const Info = observer(({className, data, ...props}: InfoProps): JSX.Element => {

	const { roomStorage } = useContext(Context);

	const usersCount = data.users.length;

	const created_at = (new Date(data.created_at)).toLocaleDateString('ru');



	const users = (data: RoomData): JSX.Element[] => {

		const users = data.users;

		return users.map((user) => {
			return (
				<div key={user.id} className='info__user'>
					{user.nickname}
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