export interface JoinRoom {
	roomId: string;
	clientId: number;
}

export interface LeaveRoom {
	roomId: string;
	clientId: number;
}

export interface UsersCirculation {
	clientId: number;
}

export interface SendMessage {
	messageId: number;
	roomId: string;
	userId: number;
}