import { action, computed, makeObservable, observable } from 'mobx';
import { RoomCreateData } from '../../models/Room/RoomCreateData';
import { RoomData } from '../../models/Room/RoomData';
import { JoinRoom, LeaveRoom, UsersCirculation } from '../../services/gateway/events';
import { RoomService } from '../../services/RoomService';
import { Storage } from '../Storage';

export class RoomStorage extends Storage {

	@observable
	rooms: RoomData[] = [];

	@observable
	activeRoom: RoomData | null = null;

	@observable
	private _roomUserData: UsersCirculation[] = [];
	private set roomJoinData(data: UsersCirculation) {
		data && this._roomUserData.push(data);
		this.lastJoined = data;
	}
	private set roomLeaveData(data: LeaveRoom) {
		this.deleteByProperty(data.clientId, 'clientId', this._roomUserData) as UsersCirculation[];
		this.lastLeaved = data;
	}
	@computed
	get roomUsersData() {
		return this._roomUserData;
	}

	@observable
	private _lastJoined: JoinRoom | null = null;
	set lastJoined(data: JoinRoom | null) {
		this._lastJoined = data;
	}
	@computed
	get lastJoined() {
		return this._lastJoined;
	}

	@observable
	_lastLeaved: LeaveRoom | null = null;
	set lastLeaved(data: JoinRoom | null) {
		this._lastLeaved = data;
	}
	@computed
	get lastLeaved() {
		return this._lastLeaved;
	}
	constructor () {
		super();
		makeObservable(this);
	}

	/**
	 * 
	 * @param needle 
	 * @param array 
	 * Удаляет элемент из массива по его значению. Значение должно быть уникальным
	 */
	private deleteByProperty (needle: any, needleName: string, array: Array<any>) {
		for (let i = 0; i < array.length; i++) {
			if (array[i][needleName] === needle) {
	 			return array.splice(i, 1);
			}
		}
	}

	/**
	 * 
	 * @param room 
	 *  Добавление комнаты в массив комнат
	 */
	@action
	private appendRoom(room: RoomData) {
		const checkExists = this.rooms.map((exRoom) => {
			if (exRoom.id === room.id) {
				return 1;
			}
		});

		if (!checkExists.includes(1)) {
			this.rooms.unshift(room);
		}			
	}

	public checkOnline (id: number) {
		const isOnline = this.roomUsersData.filter((user) => {
			return user.clientId === id;
		});

		if (isOnline.length > 0) {
			return true;
		}
		return false;
	}

	/**
	 * 
	 * @param rooms 
	 * Добавление комнат разом
	 */
	@action
	public setRooms(rooms: RoomData[]) {
		this.rooms = rooms;
	}

	/**
	 * 
	 * @param id 
	 * 
	 * Добавляет чужую комнату по id
	 */
	@action
	async addRoom(id: string) {
		try {
			const room = await RoomService.getRoom(id);
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
	@action
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
	@action
	setActiveRoom (room: RoomData, clientId: number) {

		if(this.activeRoom) {
			Storage.gateway?.leaveRoom({ roomId: this.activeRoom.id, clientId});
		}
		Storage.gateway?.joinRoom({ roomId: room.id, clientId });
		this.activeRoom = room;
	}

	/**
	 * Получает все комнаты пользователя при входе в приложение
	 */
	@action
	async getRooms () {
		try {
			const rooms = await RoomService.getRooms();
			this.setRooms(rooms.data);
		} catch (e) {
			console.log(e);
		}
	
	}

	/**
	 * Делегирует прослушку комнаты
	 */
	@action
	async listenJoin() {
		this.roomJoinData = await Storage.gateway?.listenJoin() as JoinRoom;
	}

	@action
	async listenLeave() {
		this.roomLeaveData = await Storage.gateway?.listenLeave() as LeaveRoom;
	}

	/**
	 * 
	 * @param targetUserId 
	 * @returns 
	 * Получает данные пользователя в активной комнате по id
	 */


	public getTargetUser(targetUserId: number) {
		if (this.activeRoom) {
			return this.activeRoom.users.filter((user) => {
				return user.id === targetUserId;
			})[0];
		}
	}


	public getJoinedUser () {
		const joinedUserId = this.lastJoined?.clientId;
		if (joinedUserId) {
			// this.lastJoined = null;
			return this.getTargetUser(joinedUserId);
		}
		return null;
	}


	public getLeavedUser() {
		const leavedUser = this.lastLeaved?.clientId;
		if (leavedUser) {
			this.lastLeaved = null;
			return this.getTargetUser(leavedUser);
		}
		return null;
	}

}
