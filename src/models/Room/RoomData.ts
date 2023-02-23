import { RoomMember } from './RoomMember';

export interface RoomData {
	id: string;
	name: string;
	creator: {
		id: number;
		nickname: string;
	};
	users: RoomMember[];
	created_at: Date;
}