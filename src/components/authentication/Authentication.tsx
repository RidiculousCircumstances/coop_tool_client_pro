import { AuthenticationProps } from './Authentication.props';

import './auth.scss';
import {  useContext } from 'react';
import { Input } from '../common/input/Input';
import { Button } from '../common/button/Button';
import { useForm } from 'react-hook-form';
import { AuthFormData } from './AuthFormInterface';
import { RegistrationFormData } from './RegistrationFormInterface';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const INPUT_ERROR = 'Заполните обязательные поля';


export const Authentication = observer(({...props}: AuthenticationProps) => {

	const authForm = useForm<AuthFormData>();
	const registrationForm = useForm<RegistrationFormData>();
	const context = useContext(Context);

	const onSubmitAuth = async (formData: AuthFormData) => {
		context.userStorage.login(formData);
	}

	const onSubmitRegistration = async (formData: RegistrationFormData) => {
		context.userStorage.registration(formData);
	}

	return (
		<div className='auth' {...props}>
			<div className='auth__form'>
				<div className='auth__form-container'>
					<div className='auth__form-module'>
						<span>Авторизация</span>
						<form onSubmit={authForm.handleSubmit(onSubmitAuth) }>
							<Input {...authForm.register('email', { required: {
								value: true,
								message: INPUT_ERROR
								}
							})}
							 	placeholder="email"
								type="email" />
							<Input {...authForm.register('password', {
								required: {
									value: true,
									message: INPUT_ERROR
									}
							})}
								type="password"
								placeholder="password" />
							<Button>Войти</Button>
						</form>
					</div>

					<div className='auth__form-module'>
						<span>Регистрация</span>
						<form onSubmit={registrationForm.handleSubmit(onSubmitRegistration)}>
							<Input {...registrationForm.register('email', {
								required: {
									value: true,
									message: INPUT_ERROR
								}
							})}
								placeholder="email" type="email" />
							<Input {...registrationForm.register('nickname', {
								required: {
									value: true,
									message: INPUT_ERROR
								}
							})}
								placeholder="nickname" type="text" />
							<Input {...registrationForm.register('nickname', {
								required: {
									value: true,
									message: INPUT_ERROR
								}
							})}
								placeholder="password" type="password" />
							<Button>Зарегистрироваться</Button>
						</form>
					</div>

				</div>
			</div>
		</div>
	)
});