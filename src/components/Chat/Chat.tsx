import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useRef, useState } from 'react';
import { Context } from '../..';
import { CONST } from '../../Const';
import { MessageData } from '../../models/Message/MessageData';
import { AutoTextarea } from '../AutoTextarea/AutoTextarea';
import { ChatProps } from './Chat.props';
import './chat.scss';
import { Message } from './Message/Message';
import { ReferencedMessage } from './ReferencedMessage/ReferencedMessage';
import cn from 'classnames';
import { Info } from './Info/Info';
import { UsersCount } from './usersCount/UsersCount';
import { Droptop } from '../Droptop/Droptop';

export enum DisplayTypes {
	Chat,
	RoomInfo
}

export const Chat = observer(({className, ...props}: ChatProps): JSX.Element => {

	const { roomStorage, chatStorage } = useContext(Context);
	const fileRef = useRef<HTMLInputElement>(null);
	const chatContainerRef = useRef<HTMLDivElement>(null);

	const [messages, setMessages] = useState<MessageData[] | null>(null);
	const [taggedOnReplyMsg, setTaggedOnReplyMsg] = useState<MessageData | null>(null);
	const [files, setFile] = useState<File[] | null>(null);
	const [text, setText] = useState<string>('');
	const [showBackTo, setShowBackTo] = useState<boolean>(true);
	const [displayType, setDisplayType] = useState<DisplayTypes>(DisplayTypes.Chat);
	const [isOpenedSlider, setIsOpenedSlider] = useState<boolean>(false);

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
	 * Сбрасывает состояния при смене комнаты
	 */
	useEffect(() => {
		setDisplayType(DisplayTypes.Chat);
		setText('');
		setFile(null);
		setMessages(null);
	}, [roomStorage.activeRoom])

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
	 * Прослушка скролла для кнопки возврата к началу.
	 */
	useEffect(() => {
		const container = chatStorage.chatContainerRef?.current;
		const listenToScroll = () => {
			const container = chatStorage.chatContainerRef?.current;
			if (!container) {
				return;
			}
			let heightToHideFrom = -150;
			const winScroll = container.scrollTop;
			if (winScroll < heightToHideFrom) {
				showBackTo && setShowBackTo(false);
			} else {
				setShowBackTo(true);
			}
		};
		if (!container) {
			return;
		}
		container && container.addEventListener("scroll", listenToScroll);
		return () =>
			container.removeEventListener("scroll", listenToScroll); 
	});

	/**
	 * Фейковый клик по скрытому файловому инпуту
	 */
	const handleFileClick = () => {
		fileRef?.current?.click();
	}

	/**
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
	 * @returns 
	 * Перейти к началу
	 */
	const handleBackToZero = () => {
		const container = chatStorage.chatContainerRef?.current;
		if (!container) {
			return;
		}
		container.scroll({ top: -1 });
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

	const goToRoomInfo = () => {
		isOpenedSlider && setDisplayType(DisplayTypes.RoomInfo);
	}

	const goToRoomChat = () => {
		setDisplayType(DisplayTypes.Chat);
	}

	const checkDisplayChatType = () => {
		return displayType === DisplayTypes.Chat;
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
				<div className='chat__empty'>
					{isOpenedSlider ? CONST.EMPTY_ROOM : ''}
				</div>
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

	const usersCount = roomStorage.activeRoom?.users.length;

	const usersOnlineCount = roomStorage.roomUsersData.length > 0 ? roomStorage.roomUsersData.length : null;

	const handleShowChat = () => {
		isOpenedSlider ? setIsOpenedSlider(false) : setIsOpenedSlider(true);
		if (isOpenedSlider) {
			goToRoomChat();
		}
	}

	const openSlider = () => {
		setIsOpenedSlider(true);
	}

	const handleOnSliderTitleClick = () => {

		if (!isOpenedSlider && roomStorage.activeRoom) {
			openSlider()
		} else {
			if (checkDisplayChatType()) {
				goToRoomInfo();
			} else {
				goToRoomChat();
			}
		}
	}


	return (
		<div className={cn(className, 'chat', {'chat--no-border': !isOpenedSlider},
			 { 'chat--no-border-color': !isOpenedSlider })}>
			<div className={cn('chat__top-bar', { 'chat__top-bar--border-bottom': isOpenedSlider })} >

				<div className={cn('chat__back-button-container')}>
					<div hidden={checkDisplayChatType()} className='chat__back-row' onClick={goToRoomChat}>
						<span className='icon chat__back-button'></span>
						<span className='chat__back-title'>{CONST.BACK}</span>
					</div>
				</div>

				<div className='chat__name' onClick={handleOnSliderTitleClick} title={checkDisplayChatType() && isOpenedSlider ? CONST.INFO : CONST.CHAT}>
					{	
						roomName ? (checkDisplayChatType() ? (
							<div>
								{roomName}
								<div className='chat__users-count-wrapper'>
									{usersCount && <UsersCount className='chat__users-count underline' count={usersCount} noun={CONST.USERS} />}
									{usersOnlineCount && <div className='chat__users-online'>{usersOnlineCount} {CONST.ONLINE} </div>}
								</div>
							</div>
							) : CONST.INFO) : CONST.CHOOSE_ROOM
					}
				</div>

				<div className='chat__action-dots-wrapper' onClick={handleShowChat}>
					<div className='chat__action-dots' hidden={!roomName}>...</div>
				</div>

			</div>
		
			<Droptop contentStyleActive='chat__droptop-content' 
					 containerStyleActive='chat__droptop-container'
					 active={isOpenedSlider} className='chat__droptop'>


					{displayType === DisplayTypes.Chat &&
						<div ref={chatContainerRef} className='chat__container'>
							<ul className='chat__list'>
								<div className='chat_messages'>
									{(messagesList())}
								</div>
							</ul>
						</div>
					}
					{displayType === DisplayTypes.RoomInfo && roomStorage.activeRoom &&
						<Info />
					}

					

					<div className={cn('chat__back-to-icon-wrapper')} onClick={handleBackToZero}
						hidden={showBackTo || displayType === DisplayTypes.RoomInfo}>
						<div className='icon chat__back-to-icon'></div>
					</div>
					<div className='chat__bottom-bar' hidden={!checkDisplayChatType() || !roomName}>
						{files &&
							<div className='chat__preload-container'>
								{filePreviews()}
							</div>}

						{taggedOnReplyMsg &&
							/**
							 * Тегнутое сообщение при отправке
							 */
							<ReferencedMessage type='send' refId={taggedOnReplyMsg.messageId} setActive={setTaggedOnReplyMsg} />
						}

						<div className='chat__send-bar'>
							<div onClick={handleFileClick} className='chat__append-file-container'>
								<span className='chat__file-button'></span>
								<input ref={fileRef} type={'file'} style={{ display: 'none' }}
									onChange={(e) => handleFileChange(e)}></input>
							</div>
							<div className='chat__input'>
							<AutoTextarea onKeyDown={handleKeyDownSend} minRows={1}
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

			</Droptop>
			
			
	</div>);
})