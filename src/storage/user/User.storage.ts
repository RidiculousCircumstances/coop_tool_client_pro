import { AxiosResponse } from 'axios';
import { makeAutoObservable } from 'mobx';
import { RegistrationFormData } from '../../components/authentication/RegistrationFormInterface';
import { UserData } from '../../models/User/UserData';
import { AuthService } from '../../services/AuthService';

export class UserStorage {
	isAuth: boolean = false;
	userData: UserData | null = null;


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

	setUserData (data: UserData) {
		this.userData = data;
	}

	async login (email: string, password: string) {

		try {

			const res = await AuthService.login(email, password);
			this.handleResponse(res);
			return res;
		} catch (e: any) {
			return (e);
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