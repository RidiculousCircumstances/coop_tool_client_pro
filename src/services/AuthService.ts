import { AxiosResponse } from 'axios';
import api from '../api/http';
import { ClientResponse } from '../models/ClientResponse';
import { RegistrationData } from '../models/RegistrationData';

export class AuthService {
	static async login(email: string, password: string): Promise<AxiosResponse<ClientResponse>> {
		return await api.post<ClientResponse>('user/login', { email, password });
	}

	static async register(data: RegistrationData): Promise<AxiosResponse<ClientResponse>> {
		return await api.post<ClientResponse>('user/register', { ...data });
	}

}