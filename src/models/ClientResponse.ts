import { JWTTokens } from './JWTTokens';

export interface ClientResponse {
	id?: number,
	email: string;
	ninkname: string;
	avatar?: string;
	createdAt?: Date,
	token?: string,
}