import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { Context } from '../..';
import { MessageData } from '../../models/Message/MessageData';
import { Input } from '../input/Input';
import { ChatProps } from './Chat.props';
import './chat.scss';
import { Message } from './Message/Message';

export const Chat = observer(({className, ...props}: ChatProps): JSX.Element => {

	const { roomStorage, chatStorage } = useContext(Context);
	const fileRef = useRef<HTMLInputElement>(null);


	const [messages, setMessages] = useState<MessageData[] | null>(null);

	/**
	 * Input сообщения
	 * 
	 * Пока что на бэке не реализован прием нескольких файлов
	 */
	const [files, setFile] = useState<File[] | null>(null);

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



	const handleFileClick = () => {
		fileRef?.current?.click();
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		const fileObj = e.target.files && e.target.files[0];
		if (!fileObj) {
			return;
		}
	
		setFile((files) => {
			if (!files) {
				return [fileObj];
			}
			return [...files, fileObj]
		});
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

		if (!chatId || (!text && !files)) {
			return;
		}

		const formData = new FormData();

		formData.append('chatId', chatId);
		formData.append('text', text);

		if (files && files.length > 0) {

			formData.append('image', files[0]);
		}

		const send = async () => {
			await chatStorage.sendMessage(formData);
		}
		send();

		setText('');
		setFile(null);
		
	}


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

	const handleCloseFileButton = (fileTodelete: File) => {
		const filtredFiles = files?.filter((file) => {
			return file.name !== fileTodelete.name;
		});

		setFile((file) => {
			if (!file) {
				return null;
			}
			if (!filtredFiles) {
				return null;
			}
			if (filtredFiles.length === 0) {
				return null;
			}
			return filtredFiles;
		});
	
	}

	const filePreviews = (): JSX.Element[] | JSX.Element => {

		if (!files) {
			return (<></>);
		}
		return files.map((file) => {
			const src = URL.createObjectURL(file);
			return (
				<div className='chat__preview-wrapper'>
					<div className='chat__close-bitton-wrapper' onClick={() => handleCloseFileButton(file)}>
						<div className='chat__close-button' />
					</div>
					<div key={v4()} className='chat__preview-image-wrapper'>
						<img className='chat__preview-image' src={src} alt={file.name}></img>
					</div>
				</div>
			);
		});		
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

			{files  && <div className='chat__preload-container'>
					{filePreviews()}
			</div>}

			<div className='chat__send-bar'>
				<div onClick={handleFileClick} className='chat__append-file-container'>
					<span className='chat__file-button'></span>
					<input ref={fileRef} type={'file'} style={{ display: 'none' }}
						onChange={(e) => handleFileChange(e)}></input>
				</div>

				<Input className='chat__input' placeholder='Напишите сообщение...'
					onChange={(e) => handleTextChange(e)} value={text} />

				<div className='chat__send-button-container' onClick={handleSendClick}>
					<span className='chat__send-button'></span>
				</div>
			</div>
			
			

		</div>
	</div>);
})