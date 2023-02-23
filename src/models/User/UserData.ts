export interface UserData {
	id: number,
	email: string;
	nickname: string;
	avatar?: string;
	createdAt?: Date,
	token?: string,
}