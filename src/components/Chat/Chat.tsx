import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import { MessageData } from '../../models/Message/MessageData';
import { Input } from '../input/Input';
import { ChatProps } from './Chat.props';
import './chat.scss';
import { Message } from './Message/Message';

export const Chat = observer(({className, ...props}: ChatProps): JSX.Element => {

	const { roomStorage, chatStorage } = useContext(Context);
	const [messages, setMessages] = useState<MessageData[] | null>(null);


	const roomName = roomStorage.activeRoom?.name

	/**
	 * Получает сообщения чата с установленным лимитом
	 */
	useEffect(() => {
		const roomId = roomStorage.activeRoom?.id;

		if (!roomId) {
			return;
		}

		const loadMessages = async () => {

			await chatStorage.getMessages(roomId);
			setMessages(chatStorage.messages);
		}
		loadMessages();

	}, [roomStorage.activeRoom]);


	const messagesList = (): JSX.Element | JSX.Element[] => {
		
		if (messages && messages.length > 0) {
			return messages.map((message) => {
				return (<Message key={message.messageId} data={message} />
				)
			});
		} else {
			return (
				<div className='chat__empty'>Здесь пока что ничего нет...</div>
			)
		}

		
	}

	return (
	<div className='chat'>

		<div className='chat__top-bar'>
			<div className='chat__name'>
					{roomName ?? 'Выберите комнату' }
			</div>

			<div className='chat__actions'>

			</div>
		</div>

		<div className='chat__container'>
			<ul className='chat__message-list'>
				<div className='chat_messages'>
					{(messagesList())}
				</div>
			</ul>
		</div>

		<div className='chat__bottom-bar'>

			<div className='chat__append-file-container'>
					<span className='chat__file-button'></span>
			</div>

			<Input className='chat__input' placeholder='Напишите сообщение...'/>

			<div className='chat__send-button-container'>
				<span className='chat__send-button'></span>
			</div>
			

		</div>
	</div>);
})