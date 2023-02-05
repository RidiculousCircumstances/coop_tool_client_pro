import { MessageProps } from './Message.props';
import './message.scss';
import cn from 'classnames';
import { useContext } from 'react';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';

export const Message = observer(({className, data, ...props}: MessageProps): JSX.Element => {

	const date = new Date(data.created);
	const time = `${date.getHours()}:${date.getMinutes()} ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`

	const { userStorage } = useContext(Context);
	const senderId = userStorage.userData?.id;

	return (
		<div className={cn(className, 'message')}   {...props}>

			<div className='message_user-avatar'>
				{}
			</div>


			<div className='message__container'>
				<div className='message__title'>
					<div className={cn('message__user-name', 
						{ 'message__user-name--our': senderId === data.userId })}>
						{data.nickname}
					</div>

					<div className='message__time'>
						{time}
					</div>
				</div>
				
				<div className='message__body'>
					{data.text}
				</div>


				{data.image && <div className='message__image-container'>
					<img src={data.image} alt={data.image} className='message__image' />
				</div>}

			</div>

		</div>
	)
})