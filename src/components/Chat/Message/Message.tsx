import { MessageProps } from './Message.props';
import './message.scss';
import cn from 'classnames';
import { useContext, useState } from 'react';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';
import { Images } from '../Image/Image';
import { MessageData } from '../../../models/Message/MessageData';
import { ReferencedMessage } from '../ReferencedMessage/ReferencedMessage';

export const Message = observer(({className, data, replyHandler, ...props}: MessageProps): JSX.Element => {

	
	const date = new Date(data.created);

	const time = `${date.toLocaleTimeString('ru-RU', 
	{ timeZone: 'Asia/Barnaul', timeStyle: 'short' })} 
	${date.toLocaleDateString('ru-RU')}`

	const { userStorage, chatStorage } = useContext(Context);
	const senderId = userStorage.userData?.id;


	const [isActiveReply, setActiveReply] = useState<boolean>(false)

	let referencedMessage: MessageData | null = null;
	if (data.referencedMessage) {
		const msg = chatStorage.getMessageById(data.referencedMessage);
		referencedMessage = msg ? msg[0] : null;
	}

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
				{referencedMessage &&
					<ReferencedMessage className='message__tagged-msg' type='read' refId={referencedMessage.messageId} />
				}
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