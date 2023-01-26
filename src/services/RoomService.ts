import { AxiosResponse } from 'axios';
import api from '../api/http';
import { RoomCreateData } from '../models/Room/RoomCreateData';
import { RoomData } from '../models/Room/RoomData';



export class RoomService {

	static async createRoom(data: RoomCreateData): Promise<AxiosResponse<RoomData>> {
		return await api.post<RoomData>('chat', { ...data });
	}

	static async getChat(id: string): Promise<AxiosResponse<RoomData>> {
		return await api.get<RoomData>(`chat/${id}`,);
	}

}