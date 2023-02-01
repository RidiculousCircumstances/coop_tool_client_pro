import { AxiosResponse } from 'axios';
import api from '../api/http';
import { CreateMessageData } from '../models/Message/CreateMessageData';
import { MessageData } from '../models/Message/MessageData';

export class ChatService {
	

	static async getMessage(messageId: number): Promise<AxiosResponse<MessageData>> {
		return await api.get<MessageData>(`message/${messageId}`);
	}

	static async getMessages(chatId: string): Promise<AxiosResponse<MessageData[]>> {
		return await api.get<MessageData[]>(`message/chat/${chatId}`);
	}

	static async createMessage(data: CreateMessageData): Promise<AxiosResponse<CreateMessageData>> {
		return await api.post<CreateMessageData>('message', { ...data });
	}


}