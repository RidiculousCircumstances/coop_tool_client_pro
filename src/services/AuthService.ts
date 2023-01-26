import { AxiosResponse } from 'axios';
import api from '../api/http';
import { ClientResponse } from '../models/User/ClientResponse';
import { RegistrationData } from '../models/User/RegistrationData';

export class AuthService {

	static async login(email: string, password: string): Promise<AxiosResponse<ClientResponse>> {
		return await api.post<ClientResponse>('user/authorize', { email, password });
	}

	static async register(data: RegistrationData): Promise<AxiosResponse<ClientResponse>> {
		return await api.post<ClientResponse>('user/register', { ...data });
	}
}