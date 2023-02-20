import { action, computed, makeObservable, observable } from 'mobx';
import { MessageData } from '../../models/Message/MessageData';
import { ChatService } from '../../services/ChatService';
import { SendMessage } from '../../services/gateway/events';
import { Storage } from '../Storage';

export class ChatStorage extends Storage {

	@observable
	private _messages: MessageData[] | null = null;

	set messages(messages: MessageData[] | null) {
		if (messages) {
			this._messages = messages.reverse();
		}
	}
	set message(message: MessageData | null) {
		if (message) {
			this._messages?.push(message);
		}
	}
	@computed
	get messages() {
		return this._messages;
	}

	@observable
	private _incomingMessage: SendMessage | null = null;
	set incomingMessage(msg: SendMessage | null) {
		this._incomingMessage = msg;
	}
	@computed
	get incomingMessage() {
		return this._incomingMessage;
	}
	
	@observable
	private _chatContainerRef: React.RefObject<HTMLDivElement> | null = null;
	set chatContainerRef(ref: React.RefObject<HTMLDivElement> | null) {
		this._chatContainerRef = ref;
	}
	@computed
	get chatContainerRef() {
		return this._chatContainerRef!;
	}

	constructor () {
		super();
		makeObservable(this);
	}

	getMessageById (messageId: number) {
		return this.messages?.filter((message) => {
			return messageId === message.messageId;
		});
	}

	/**
	 * 
	 * @param chatId 
	 * @returns 
	 * получает и устанавливает сообщения чата с базовым лимитом
	 */
	@action
	async getMessages (chatId: string) {
		try {
			const messages = await ChatService.getMessages(chatId);
			this.messages = messages.data;
		} catch (e: any) {
			console.log(e.message);
			return (e.response.status);
		}

	}

	/**
	 * получает сообщение
	 */
	@action
	async getMessage (messageid: number) {
		try {
			const message = await ChatService.getMessage(messageid);
			this.message = message.data;
		} catch (e: any) {
			console.log(e);
			return (e.response.status);
		}
	}

	/**
	 * 
	 * @param data 
	 * @returns 
	 * Отправляет сообщение и добавляет его в состояние сообщений
	 */
	@action
	async sendMessage (data: FormData) {
		try {
			const {data: messageData} = await ChatService.sendMessage(data);
			this.message = messageData;
			Storage.gateway?.notifySendMessage({
				messageId: messageData.messageId,
				roomId: messageData.chatId,
				userId: messageData.userId,

			});
		} catch (e: any) {
			console.log(e);
			return (e.message);
		}
	}

	@action
	async listenMessage() {
		this.incomingMessage = await Storage.gateway?.listenMessages() as SendMessage;
	}

}

