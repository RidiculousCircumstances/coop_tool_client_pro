import { AuthenticationProps } from './Authentication.props';

import './auth.scss';
import {  useContext, useState } from 'react';
import { Input } from './input/Input';
import { Button } from './button/Button';
import { useForm } from 'react-hook-form';
import { AuthFormData } from './AuthFormInterface';
import { RegistrationFormData } from './RegistrationFormInterface';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

const INPUT_ERROR = 'Заполните обязательные поля';


export const Authentication = observer(({...props}: AuthenticationProps) => {

	const [choicenView, setView] = useState<'auth' | 'register'>('auth');
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<string>();

	const authForm = useForm<AuthFormData>();
	const registrationForm = useForm<RegistrationFormData>();
	const context = useContext(Context);


	const tryRequest =async (cb: CallableFunction) => {
		try {
			const res = await cb();;
			if (res.status === 201) {
				setIsSuccess(true);
				authForm.reset();
			} else {
				setError(`Ошибка ${res.status}`);
			}
		} catch (e) {
			setError(e as string);
		}
	}

	const onSubmitAuth = async (formData: AuthFormData) => {
		tryRequest(() => context.userStorage.login(formData.email, formData.password));
	}

	const onSubmitRegistration = async (formData: RegistrationFormData) => {
		tryRequest(() => context.userStorage.registration(formData));
	}

	const formSwitcher = (display: 'auth' | 'register') => {
		if (display === 'auth') {
			return (
			<form className='auth__form-module' onSubmit={authForm.handleSubmit(onSubmitAuth)}>
				<div className='auth__input_wrapper'>
					<Input {...authForm.register('email', {
						required: {
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
					<Input disabled></Input>
				</div>
					<Button>OK</Button>
			</form>
			)
		} else {
			return (
			<form className='auth__form-module' onSubmit={registrationForm.handleSubmit(onSubmitRegistration)}>
					<div className='auth__input_wrapper'>
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
						<Input {...registrationForm.register('password', {
							required: {
								value: true,
								message: INPUT_ERROR
							}
						})}
							placeholder="password" type="password" />
					</div>
				<Button>OK</Button>
			</form>
		
			)
			
		}

	}


	const color = {
		color: 'yellow'
	}

	return (
		<div className='auth' {...props}>
			<div className='auth__form'>
				<div className='auth__form-container'>
					<div className='auth__title_wrapper'>
						<div onClick={() => setView('auth')}>SignIn </div>
						<div onClick={() => setView('register')}>SignUp</div>
					</div>
					{choicenView === 'auth' ? formSwitcher('auth') : formSwitcher('register')}
					{isSuccess && (<div style={color}>вСЕ ПРОШЛО ОТНОСИТЕЛЬНО ЗАЕБИСЬ</div>)}
					{error && (<div style={color}>чЕТА ПaШЛО НЕ ТАК:</div>)}
				</div>
			</div>
		</div>
	)
});