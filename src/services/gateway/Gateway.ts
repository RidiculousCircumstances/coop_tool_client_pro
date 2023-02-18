import { makeAutoObservable } from 'mobx';
import { Manager, Socket } from 'socket.io-client';
import { CONST } from '../../Const';
import { JoinRoom, LeaveRoom, SendMessage } from './events';

export class Gateway {

	private static instance: Gateway;
	private manager: Manager;
	private socket: Socket;


	private constructor() {
		this.manager = new Manager(CONST.SOCKET_URL);
		this.socket = new Socket(this.manager, '/');
		makeAutoObservable(this)
	}

	public static getInstance(): Gateway {

		if (!Gateway.instance) {
			Gateway.instance = new Gateway();
		}
		return Gateway.instance;
	}

	public joinRoom (data: JoinRoom) {
		this.socket.emit('joinRoom', data);
	}

	public leaveRoom (data: LeaveRoom) {
		this.socket.emit('leaveRoom', data);
	}

	public listenJoin() {

		return new Promise((resolve) => {
			this.socket.on('joinRoom', (data: JoinRoom) => {
				resolve(data);
			});
		});
	}

	public listenLeave() {
		return new Promise((resolve) => {
			this.socket.on('leaveRoom', (data: LeaveRoom) => {
				resolve(data);
				});
			});
	}

	public notifySendMessage (data: SendMessage) {
		this.socket.emit('sendMessage', data);
	}

	public listenMessages() {
		return new Promise((resolve) => {
			this.socket.on('sendMessage', (data: SendMessage) => {
				resolve(data);
				});
			});
	}

}