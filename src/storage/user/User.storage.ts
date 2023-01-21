import { AxiosResponse } from 'axios';
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

	private handleResponse (res: AxiosResponse) {
		if (!res.data.token) {
			return new Error('Неизвестная ошибка сервера');
		}
		localStorage.setItem('token', res.data.token);
		this.setUserData(res.data);
		this.setAuth(true);
	}

	setAuth (bool: boolean) {
		this.isAuth = bool;
	}

	setUserData (data: ClientResponse) {
		this.userData = data;
	}

	async login (email: string, password: string) {

		try {
			const res = await api.post<ClientResponse>('user/authorize', { email, password });
			this.handleResponse(res);
		} catch (e: any) {
			return (e.response.status);
		}
	}

	async registration (data: RegistrationFormData) {

		try {
			const res = await api.post<ClientResponse>('user/register', { ...data });
			this.handleResponse(res);
		} catch (e: any) {
			return (e.response.status);
		}
	
	}

}