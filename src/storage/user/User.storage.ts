import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import api from '../../api/http';
import { AuthFormData } from '../../components/authentication/AuthFormInterface';
import { RegistrationFormData } from '../../components/authentication/RegistrationFormInterface';
import { ClientResponse } from '../../models/User/ClientResponse';
import { AuthService } from '../../services/AuthService';

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
			const res = await AuthService.login(email, password);
			this.handleResponse(res);
		} catch (e: any) {
			return (e.response.status);
		}
	}

	async registration ({email, nickname, password}: RegistrationFormData) {
		if (nickname) {
			try {
				const res = await AuthService.register({ email, nickname, password });
				this.handleResponse(res);
			} catch (e: any) {
				return (e.response.status);
			}
		}
		
	}

}