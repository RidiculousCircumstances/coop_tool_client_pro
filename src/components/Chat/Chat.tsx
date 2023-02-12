import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../..';
import { CONST } from '../../Const';
import { MessageData } from '../../models/Message/MessageData';
import { Textarea } from '../textarea/Textarea';
import { ChatProps } from './Chat.props';
import './chat.scss';
import { Message } from './Message/Message';
import { ReferencedMessage } from './ReferencedMessage/ReferencedMessage';

export const Chat = observer(({className, ...props}: ChatProps): JSX.Element => {

	const { roomStorage, chatStorage } = useContext(Context);
	const fileRef = useRef<HTMLInputElement>(null);
	const chatContainerRef = useRef<HTMLDivElement>(null);

	const [messages, setMessages] = useState<MessageData[] | null>(null);
	const [taggedOnReplyMsg, setTaggedOnReplyMsg] = useState<MessageData | null>(null);
	const [files, setFile] = useState<File[] | null>(null);
	const [text, setText] = useState<string>('');


	const roomName = roomStorage.activeRoom?.name

	chatStorage.chatContainerRef = chatContainerRef;

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
	 * Фейковый клик по скрытому файловому инпуту
	 */

	const handleFileClick = () => {
		fileRef?.current?.click();
	}

	/**
	 * 
	 * @param fileObj 
	 * @returns 
	 * Обработка установления состояния файлового инпута
	 */
	const takeInputFile = (fileObj: File | null) => {
		if (!fileObj) {
			return;
		}

		if (!CONST.ALLOWED_FILES.includes(fileObj.type)) {
			return;
		}

		setFile((files) => {
			if (!files) {
				return [fileObj];
			}
			return [...files, fileObj]
		});
	}

	/**
	 * 
	 * @param e 
	 * @returns 
	 * Вставить файл из буфера обмена
	 */
	const handleFilePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {

		if (e.type !== 'paste') {
			return;
		}

		const data = e.clipboardData.files[0];
		if (!data) {
			return;
		}
		takeInputFile(data);

	}

	/**
	 * 
	 * @param e 
	 * @returns 
	 * Вставить файл по клику на кнопку
	 */
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileObj = e.target.files && e.target.files[0];
		takeInputFile(fileObj);
	}

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const textData = e.target.value;
		setText(textData);
	}

	/**
	 * 
	 * @returns 
	 * Физическая обработка отправки сообщения
	 */
	const sendMessage = () => {
		const chatId = roomStorage.activeRoom?.id;
		const chatContainer = chatStorage.chatContainerRef?.current;
		if (!chatId || (!text && !files) || !chatContainer) {
			return;
		}

		const formData = new FormData();

		formData.append('chatId', chatId);
		formData.append('text', text!);

		if (files && files.length > 0) {
			files.forEach((file) => {
				formData.append('image', file);
			});
		}

		if (taggedOnReplyMsg) {
			const id = taggedOnReplyMsg.messageId;
			formData.append('referencedMessage', id.toString());
		}

		const send = async () => {
			await chatStorage.sendMessage(formData);
		}
		send();

		setText('');
		setFile(null);
		setTaggedOnReplyMsg(null);
		chatContainer.scroll({ top: 0 })
	}

	/**
	 * 
	 * @returns 
	 * Обработка события клика на иконку отправки сообщения
	 */
	const handleSendClick = () => {
		sendMessage();
	}

	/**
	 * 
	 * @param e 
	 * Отправка сообщения по комбинации клавиш
	 */
	const handleKeyDownSend = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {

		if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
			sendMessage();
		}
	}

	/**
	 * 
	 * @param fileTodelete 
	 * Удалить файл из инпута
	 */
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

	/**
	 * 
	 * @param messageId 
	 * @returns 
	 * Обработка отображения тегнутого сообщения при отправке
	 */
	const handleTaggedOnReplyMsg = (messageId: number) => {
		const result = chatStorage.getMessageById(messageId);
		if (!result) {
			return;
		}

		const taggedMessage = result[0];
		setTaggedOnReplyMsg(taggedMessage);
	}

	/**
	 * 
	 * @returns 
	 * Возвращает лист компонентов сообщений
	 */
	const messagesList = (): JSX.Element | JSX.Element[] => {

		if (messages && messages.length > 0) {
			return messages.map((message) => {

				return (<Message key={message.messageId} data={message} replyHandler={handleTaggedOnReplyMsg}
					 />
				)
			});
		} else {
			return (
				<div className='chat__empty'>Здесь пока что ничего нет...</div>
			)
		}


	}

	const filePreviews = (): JSX.Element[] | JSX.Element => {

		if (!files || files.length > 6) {
			return (<></>);
		}
		return files.map((file) => {
			const src = URL.createObjectURL(file);
			return (
				<div key={file.lastModified} className='chat__preview-wrapper'>
					<div className='chat__close-button-wrapper' onClick={() => handleCloseFileButton(file)}>
						<div className='chat__close-button' />
					</div>
					<div className='chat__preview-image-wrapper'>
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
		</div>

		<div ref={chatContainerRef} className='chat__container'>
			<ul className='chat__message-list'>
				<div className='chat_messages'>
					{(messagesList())}
				</div>
			</ul>
		</div>

		<div className='chat__bottom-bar'>

			{files && 
			<div className='chat__preload-container'>
					{filePreviews()}
			</div>}

			{taggedOnReplyMsg &&

			/**
			 * Тегнутое сообщение при отправке
			 */
			<ReferencedMessage type='send' refId={taggedOnReplyMsg.messageId} setActive={setTaggedOnReplyMsg}/>
			}

			<div className='chat__send-bar'>
				<div onClick={handleFileClick} className='chat__append-file-container'>
					<span className='chat__file-button'></span>
					<input ref={fileRef} type={'file'} style={{ display: 'none' }}
						onChange={(e) => handleFileChange(e)}></input>
				</div>

				<div className='chat__input'>
						<Textarea onKeyDown={handleKeyDownSend} minRows={1} 
						maxRows={5} placeholder='Напишите сообщение...'
						onChange={handleTextChange} 
						onPaste={handleFilePaste}
						value={text} />
				</div>
				
				<div className='chat__send-button-container' onClick={handleSendClick}>
					<span className='chat__send-button'></span>
				</div>
			</div>
			
		</div>
	</div>);
})