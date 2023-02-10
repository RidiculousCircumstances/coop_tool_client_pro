import { MessageProps } from './Message.props';
import './message.scss';
import cn from 'classnames';
import { useContext, useState } from 'react';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';
import { Images } from '../Image/Image';

export const Message = observer(({className, data, replyHandler, ...props}: MessageProps): JSX.Element => {

	
	const date = new Date(data.created);

	const time = `${date.toLocaleTimeString('ru-RU', 
	{ timeZone: 'Asia/Barnaul', timeStyle: 'short' })} 
	${date.toLocaleDateString('ru-RU')}`

	const { userStorage } = useContext(Context);
	const senderId = userStorage.userData?.id;


	const [isActiveReply, setActiveReply] = useState<boolean>(false)


	return (
		<div onMouseEnter={() => setActiveReply(true)}
			onMouseLeave={() => setActiveReply(false)}
			className={cn(className, 'message')}   {...props}>

			<div className={cn('message__reply-icon icon', 
				{ 'message__reply-icon--active': isActiveReply })}
				onClick={() => replyHandler(data.messageId)}></div>
	
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


				{data.images && 
					<Images paths={data.images} />
				}

			</div>

		</div>
	)
})