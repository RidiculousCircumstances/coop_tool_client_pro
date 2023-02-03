import { makeAutoObservable } from 'mobx';
import { MessageData } from '../../models/Message/MessageData';
import { RoomCreateData } from '../../models/Room/RoomCreateData';
import { RoomData } from '../../models/Room/RoomData';
import { JoinRoom, LeaveRoom, SendMessage } from '../../services/gateway/events';
import { Gateway } from '../../services/gateway/Gateway';
import { RoomService } from '../../services/RoomService';

export class RoomStorage {

	rooms: RoomData[] = [];

	activeRoom: RoomData | null = null;

	gateway: Gateway = Gateway.getInstance();

	roomJoinData: JoinRoom | null = null;

	roomLeaveData: LeaveRoom | null = null;

	constructor () {
		makeAutoObservable(this);
	}



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

	public setRooms(rooms: RoomData[]) {
		this.rooms = rooms;
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
	setActiveRoom (room: RoomData, clientId: number) {

		if(this.activeRoom) {
			this.gateway.leaveRoom({ roomId: this.activeRoom.id, clientId});
		}
		this.gateway.joinRoom({ roomId: room.id, clientId });
		this.activeRoom = room;
	}

	/**
	 * Получает все комнаты пользователя при входе в приложение
	 */
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
	async listenRoom () {
		this.roomJoinData = await this.gateway.listenJoin() as JoinRoom;
		this.roomLeaveData = await this.gateway.listenLeave() as LeaveRoom;
		
	}

	/**
	 * 
	 * @param targetUserId 
	 * @returns 
	 * Получает данные пользователя в активной комнате по id
	 */
	private getTargetUser(targetUserId: number) {

		if (this.activeRoom) {
			return this.activeRoom.users.filter((user) => {
				return user.id === targetUserId;
			})[0];
		}
			
	}

	public getJoinedUser () {
		const joinedUserId = this.roomJoinData?.clientId;
		if (joinedUserId) {
			return this.getTargetUser(joinedUserId);
		}
		return null;
		
	}

	public getLeavedUser() {
		const leavedUser = this.roomLeaveData?.clientId;
		if (leavedUser) {
			return this.getTargetUser(leavedUser);
		}
		return null;
	}


}
