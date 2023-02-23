import { AxiosResponse } from 'axios';
import api from '../api/http';
import { RoomCreateData } from '../models/Room/RoomCreateData';
import { RoomData } from '../models/Room/RoomData';
import { RoomMember } from '../models/Room/RoomMember';



export class RoomService {


	static async createRoom(data: RoomCreateData): Promise<AxiosResponse<RoomData>> {
		return await api.post<RoomData>('chat', { ...data });
	}

	/**
	 * Получает полные данные указанной комнаты
	 * @param id 
	 * @returns 
	 */
	static async getRoom(id: string): Promise<AxiosResponse<RoomData>> {
		return await api.get<RoomData>(`chat/${id}`,);
	}

	/**
	 * Получить список чатов
	 * @returns 
	 */
	static async getRooms(): Promise<AxiosResponse<RoomData[]>> {
		return await api.get<RoomData[]>(`chat`,);
	}

}