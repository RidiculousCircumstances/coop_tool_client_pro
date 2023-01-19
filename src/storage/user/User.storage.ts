import { makeAutoObservable } from 'mobx';
import api from '../../api/http';
import { AuthFormData } from '../../components/authentication/AuthFormInterface';
import { RegistrationFormData } from '../../components/authentication/RegistrationFormInterface';
import { ClientResponse } from '../../models/ClientResponse';

export class UserStorage {
	isAuth: boolean = false;
	userData: ClientResponse | null = null;
	constructor () {
		makeAutoObservable(this);
	}

	setAuth (bool: boolean) {
		this.isAuth = bool;
	}

	setUserData (data: ClientResponse) {
		this.userData = data;
	}

	async login (email: string, password: string) {
		const res = await api.post<ClientResponse>('user/authorize', { email, password });
	}

	async registration (data: RegistrationFormData) {
		const res = await api.post<ClientResponse>('user/register', { ...data });
		if (!res.data.token) {
			return new Error('Неизвестная ошибка сервера');
		}
		localStorage.setItem('token', res.data.token);
		this.setUserData(res.data);
		this.setAuth(true);
	}

}