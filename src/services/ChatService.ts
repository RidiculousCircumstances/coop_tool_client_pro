import { AxiosResponse } from 'axios';
import api from '../api/http';
import { MessageData } from '../models/Message/MessageData';

export class ChatService {
	

	static async getMessage(messageId: number): Promise<AxiosResponse<MessageData>> {
		return await api.get<MessageData>(`message/${messageId}`);
	}

	static async getMessages(chatId: string): Promise<AxiosResponse<MessageData[]>> {
		return await api.get<MessageData[]>(`message/chat/${chatId}`);
	}

	static async sendMessage(formData: FormData): Promise<AxiosResponse<MessageData>> {
		return await api.post<MessageData>('message', formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			}
		} );
	}


}