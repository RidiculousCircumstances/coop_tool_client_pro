import { makeAutoObservable } from 'mobx';
import { AuthFormData } from '../../components/authentication/AuthFormInterface';
import { RegistrationFormData } from '../../components/authentication/RegistrationFormInterface';

export class UserStorage {
	user: boolean = false;
	constructor () {
		makeAutoObservable(this);
	}

	setUser (set: boolean) {
		this.user = set;
	}

	isAuth () {
		if (this.user) {
			return true;
		} else {
			return false;
		}

	}

	login (data: AuthFormData) {
		console.log('logged in');
	}

	registration (data: RegistrationFormData) {

	}

}