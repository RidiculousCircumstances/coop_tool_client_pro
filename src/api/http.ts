import axios, { AxiosHeaders } from 'axios';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '..';
import { CONST } from '../Const';
import { UserStorage } from '../storage/user/User.storage';

const api = axios.create({
	withCredentials: true,
	baseURL: CONST.HTTPURL,
});



api.interceptors.request.use((config) => {

	if (config.headers) {
		const token = `Bearer ${localStorage.getItem('token')}`;
		(config.headers as AxiosHeaders).set('Authorization', token);
		return config;
	}
	throw new Error('Отсутствует header для записи авторизационного токена');
});


export default api;