import { makeAutoObservable } from 'mobx';
import { MessageData } from '../../models/Message/MessageData';
import { ChatService } from '../../services/ChatService';
import { SendMessage } from '../../services/gateway/events';
import { Gateway } from '../../services/gateway/Gateway';

export class ChatStorage {

	private _messages: MessageData[] | null = null;

	incomingMessage: SendMessage | null = null;
	
	gateway: Gateway = Gateway.getInstance();

	private taggedMessage: MessageData | null = null;


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

	get messages () {
		return this._messages;
	}

	constructor () {
		makeAutoObservable(this);
	}

	getMessageById (messageId: number) {
		return this.messages?.filter((message) => {
			return messageId === message.messageId;
		});
	}

	async getMessages (chatId: string) {
		try {
			const messages = await ChatService.getMessages(chatId);
			this.messages = messages.data;
		} catch (e: any) {
			console.log(e.message);
			return (e.response.status);
		}

	}

	async getMessage (messageid: number) {
		try {
			const message = await ChatService.getMessage(messageid);
			this.message = message.data;
		} catch (e: any) {
			console.log(e);
			return (e.response.status);
		}
	}

	async sendMessage (data: FormData) {
		try {
			const {data: messageData} = await ChatService.sendMessage(data);
			this.message = messageData;
			this.gateway.notifySendMessage({
				messageId: messageData.messageId,
				roomId: messageData.chatId,
				userId: messageData.userId,

			});
		} catch (e: any) {
			console.log(e);
			return (e.message);
		}
	}

	async listenMessage() {
		this.incomingMessage = await this.gateway.listenMessages() as SendMessage;
	}


}

