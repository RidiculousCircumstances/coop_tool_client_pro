import { makeAutoObservable } from 'mobx';
import { Manager, Socket } from 'socket.io-client';
import { CONST } from '../../Const';
import { JoinRoom, LeaveRoom } from './events';

export class Gateway {

	private static instance: Gateway;
	private manager: Manager;



	private constructor() {
		this.manager = new Manager(CONST.SOCKET_URL);
		makeAutoObservable(this)
	}

	public static getInstance(): Gateway {

		if (!Gateway.instance) {
			Gateway.instance = new Gateway();
		}
		return Gateway.instance;
	}

	public joinRoom (data: JoinRoom) {
		const room = this.manager.socket('/');
		room.emit('joinRoom', data);
	}

	public leaveRoom (data: LeaveRoom) {
		const room = this.manager.socket('/');
		room.emit('leaveRoom', data);
	}

	public listenJoin() {
		const room = this.manager.socket('/');

		return new Promise((resolve) => {
			room.on('joinRoom', (data: JoinRoom) => {
				resolve(data);
			});
		});
	}

	public listenLeave() {
		const room = this.manager.socket('/');

		return new Promise((resolve) => {
			room.on('leaveRoom', (data: LeaveRoom) => {
				resolve(data);
			});
		});
	}


}