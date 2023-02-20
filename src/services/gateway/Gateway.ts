import { makeAutoObservable } from 'mobx';
import { useContext } from 'react';
import { Manager, Socket } from 'socket.io-client';
import { Context } from '../..';
import { CONST } from '../../Const';
import { JoinRoom, LeaveRoom, SendMessage } from './events';

export class Gateway {

	private static instance: Gateway;
	private manager: Manager;
	private socket: Socket;


	private constructor(userId: number) {
		this.manager = new Manager(CONST.SOCKET_URL, {
			query: {
				userId
			}
		});
		
		this.socket = new Socket(this.manager, '/');
		makeAutoObservable(this)
	}

	/**
	 * 
	 * @param userId 
	 * @returns 
	 * Возвращает синглтон и задает пользователя сокета
	 */
	public static getInstance(userId: number): Gateway {

		if (!Gateway.instance) {
			Gateway.instance = new Gateway(userId);
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