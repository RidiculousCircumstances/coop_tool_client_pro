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
			const res = await RoomService.getChat(id);
			alert(JSON.stringify(res.data));
			this.appendRoom(res.data);
		} catch (e) {

		}

	}

	/**
	 * 
	 * @param roomData 
	 * Создает новую комнату
	 */
	async createRoom (roomData: RoomCreateData) {
		try {
			const res = await RoomService.createRoom(roomData);
			this.appendRoom(res.data);
		} catch (e) {

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
	getRooms () {

	}
}

