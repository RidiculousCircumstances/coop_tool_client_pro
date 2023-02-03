import { AxiosResponse } from 'axios';
import api from '../api/http';
import { UserData } from '../models/User/UserData';
import { RegistrationData } from '../models/User/RegistrationData';

export class AuthService {

	static async login(email: string, password: string): Promise<AxiosResponse<UserData>> {
		const res = await api.post<UserData>('user/authorize', { email, password });
		return res;
	}

	static async register(data: RegistrationData): Promise<AxiosResponse<UserData>> {
		return await api.post<UserData>('user/register', { ...data });
	}
}