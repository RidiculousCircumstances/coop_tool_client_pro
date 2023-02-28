import { action, computed, makeObservable, observable } from 'mobx';
import { RoomCreateData } from '../../models/Room/RoomCreateData';
import { RoomData } from '../../models/Room/RoomData';
import { UsersCirculation } from '../../services/gateway/events';
import { MemberService } from '../../services/MemberService';
import { RoomService } from '../../services/RoomService';
import { Storage } from '../Storage';

export class RoomStorage extends Storage {

	@observable
	rooms: RoomData[] = [];

	@observable
	activeRoom: RoomData | null = null;

	/**
	 * Массив пользователей онлайн
	 */
	@observable
	private _roomUserData: UsersCirculation[] = [];
	private set roomJoinData(data: UsersCirculation) {
		data && 
		!this._roomUserData.some((user) => {
			return user.clientId === data.clientId;
		}) &&
		this._roomUserData.push(data);
		this.lastJoined = data;
	}
	private set roomLeaveData(data: UsersCirculation) {
		this.deleteByProperty(data, 'clientId', this._roomUserData) as UsersCirculation[];
		this.lastLeaved = data;
	}
	private set roomUsersData(data: UsersCirculation[]) {
		this._roomUserData = data;
	}
	@computed
	get roomUsersData() {
		return this._roomUserData;
	}

	@observable
	private _lastJoined: UsersCirculation | null = null;
	set lastJoined(data: UsersCirculation | null) {
		this._lastJoined = data;
	}
	@computed
	get lastJoined() {
		return this._lastJoined;
	}

	@observable
	private _lastLeaved: UsersCirculation | null = null;
	set lastLeaved(data: UsersCirculation | null) {
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
	 * Удаляет элемент из массива по его значению. Значение должно быть уникальным
	 * @param needle 
	 * @param array 
	 * 
	 */
	private deleteByProperty (needle: any, needleName: string, array: Array<any>) {
		for (let i = 0; i < array.length; i++) {
			if (array[i][needleName] === needle.clientId) {
	 			return array.splice(i, 1);
			}
		}
	}

	/**
	 * Добавление комнаты в массив комнат
	 * @param room
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

	@action
	public checkOnline (id: number) {
		if (this.roomUsersData.length === 0) {
			return;
		}
		const isOnline = this.roomUsersData.some((user) => {
			return user.clientId === id;
		});
	
		if (isOnline) {
			return true;
		}
		return false;
	}

	/**
	 * 
	 * @param rooms 
	 * Добавление комнат при подключении
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
	 * Получает все комнаты по http пользователя при входе в приложение
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
		this.roomJoinData = await Storage.gateway?.listenJoin() as UsersCirculation;
	}

	@action
	async listenLeave() {
		this.roomLeaveData = await Storage.gateway?.listenLeave() as UsersCirculation;
	}

	@action
	async setUsersOnline() {
		const usersOnline = await Storage.gateway?.listenUsersOnline() as { clientIds: UsersCirculation[] };
		
		this.roomUsersData = usersOnline.clientIds;
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

	@action
	public async addRoomMember(id: number) {
		const res = await MemberService.getMember(id);
		try {
			const member = res.data;
			this.activeRoom?.users.push({
				id: member.id,
				nickname: member.nickname,
			});
		} catch (e: any) {
			console.log(e);
			return e;
		}
	}

}
