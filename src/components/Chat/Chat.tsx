import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../..';
import { MessageData } from '../../models/Message/MessageData';
import { Input } from '../input/Input';
import { ChatProps } from './Chat.props';
import './chat.scss';
import { Message } from './Message/Message';

export const Chat = observer(({className, ...props}: ChatProps): JSX.Element => {

	const { roomStorage, chatStorage } = useContext(Context);
	const fileRef = useRef<HTMLInputElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);

	const [messages, setMessages] = useState<MessageData[] | null>(null);

	/**
	 * Input сообщения
	 */
	const [file, setFile] = useState<File | null>(null);
	const [text, setText] = useState<string>('');

	const roomName = roomStorage.activeRoom?.name


	useEffect(() => {

		const listen = async () => {
			await chatStorage.listenMessage();
		}

		listen();

	}, [chatStorage.incomingMessage, chatStorage]);

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

	}, [roomStorage.activeRoom, roomStorage, chatStorage]);

	/**
	 * Получает входящее сообщение
	 */
	useEffect(() => {
		const incomingMessage = chatStorage.incomingMessage;
		if (!incomingMessage) {
			return;
		}

		const getMessage = async () => {
			await chatStorage.getMessage(incomingMessage.messageId);
		}

		getMessage();

	}, [chatStorage.incomingMessage, chatStorage]);

	/**
	 * 
	 * @returns 
	 * Возвращает лист компонентов сообщений
	 */
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

	const handleFileClick = () => {
		fileRef?.current?.click();
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		const fileObj = e.target.files && e.target.files[0];
		if (!fileObj) {
			return;
		}
		setFile(fileObj);
	}

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const textData = e.target.value;

		setText(textData);
	}

	/**
	 * 
	 * @returns 
	 * Обработка события отправки сообщения
	 */
	const handleSendClick = () => {
		const chatId = roomStorage.activeRoom?.id;

		if (!chatId || (!text && !file)) {
			return;
		}

		const formData = new FormData();

		formData.append('chatId', chatId);
		formData.append('text', text);

		if (file) {
			formData.append('image', file);
		}

		const send = async () => {
			await chatStorage.sendMessage(formData);
		}
		send();

		setText('');
		setFile(null);
		
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

			<div ref={scrollRef} className='chat__container'>
			<ul className='chat__message-list'>
				<div className='chat_messages'>
					{(messagesList())}
				</div>
			</ul>
		</div>

		<div className='chat__bottom-bar'>

				<div onClick={handleFileClick} className='chat__append-file-container'>
					<span className='chat__file-button'></span>
					<input ref={fileRef} type={'file'} style={{ display: 'none' }}
							onChange={(e) => handleFileChange(e)}></input>
			</div>

				<Input className='chat__input' placeholder='Напишите сообщение...' 
					onChange={(e) => handleTextChange(e)} value={text}/>

				<div className='chat__send-button-container' onClick={handleSendClick}>
				<span className='chat__send-button'></span>
			</div>
			

		</div>
	</div>);
})