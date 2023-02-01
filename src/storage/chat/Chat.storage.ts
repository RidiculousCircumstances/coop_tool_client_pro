import { makeAutoObservable } from 'mobx';
import { MessageData } from '../../models/Message/MessageData';
import { ChatService } from '../../services/ChatService';

export class ChatStorage {

	private _messages: MessageData[] | null = null;

	set messages(messages: MessageData[] | null) {
		if (messages) {
			this._messages = messages.reverse();
		}
	}

	get messages () {
		return this._messages;
	}

	constructor () {

		makeAutoObservable(this);
	}

	async getMessages (chatId: string) {
		try {
			const messages = await ChatService.getMessages(chatId);
			this.messages = messages.data;
		} catch (e: any) {
			return (e.response.status);
		}

	}
}

