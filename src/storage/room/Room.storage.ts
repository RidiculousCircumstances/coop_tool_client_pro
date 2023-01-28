import { makeAutoObservable } from 'mobx';
import { RoomCreateData } from '../../models/Room/RoomCreateData';
import { RoomData } from '../../models/Room/RoomData';
import { RoomService } from '../../services/RoomService';

export class RoomStorage {

	rooms: RoomData[] = [];



	constructor () {
		makeAutoObservable(this);
	}

	private appendRoom(room: RoomData) {
		this.rooms.push(room);
	}

	/**
	 * 
	 * @param id 
	 * 
	 * Добавляет чужую комнату по id
	 */
	async addRoom(id: string) {
		try {
			const room = await RoomService.getRoom(id);
			alert(JSON.stringify(room.data));
			this.appendRoom(room.data);
		} catch (e: any) {
			return (e.response.status);
		}

	}

	/**
	 * 
	 * @param roomData 
	 * Создает новую комнату
	 */
	async createRoom (roomData: RoomCreateData) {
		try {
			const room = await RoomService.createRoom(roomData);
			this.appendRoom(room.data);
		} catch (e: any) {
			return (e.response.status);
		}
	}

	/**
	 * Устанавливает активную комнату при ее выборе из списка
	 */
	setActiveRoom () {

	}

	/**
	 * Получает все комнаты пользователя при входе в приложение
	 */
	async getRooms () {
		try {
			const rooms = await RoomService.getRooms();
			this.rooms = rooms.data;
		} catch (e) {

		}
	
	}
}

