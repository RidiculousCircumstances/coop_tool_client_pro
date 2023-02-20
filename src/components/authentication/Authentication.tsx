import { AuthenticationProps } from './Authentication.props';
import cn from 'classnames';
import './auth.scss';
import {  useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthFormData } from './AuthFormInterface';
import { RegistrationFormData } from './RegistrationFormInterface';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import { AuthForm } from './authForm/AuthForm';
import { Storage } from '../../storage/Storage';
import { Gateway } from '../../services/gateway/Gateway';

export const Authentication = observer(({...props}: AuthenticationProps) => {

	const [choicenView, setView] = useState<'login' | 'register'>('login');
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [error, setError] = useState<number>();

	const authForm = useForm<AuthFormData>();
	const { userStorage } = useContext(Context);



	/**
	 * 
	 * @param cb 
	 */
	const tryAuth =async (cb: CallableFunction) => {
		const res = await cb();
		console.log(res.status);
		if (res.status === 201 || res.status === 200 ) {
			const userId = res.data.id;
			const gateway = Gateway.getInstance(userId);
			Storage.setSocket(gateway);
			setIsSuccess(true);
			authForm.reset();
		} else {
			setError(res);
		}

	}

	const onSubmitAuth = async (formData: AuthFormData) => {
		tryAuth(() => userStorage.login(formData.email, formData.password));
	}

	const onSubmitRegistration = async (formData: RegistrationFormData) => {
		tryAuth(() => userStorage.registration(formData));
	}

	const formProps = {
		type: choicenView,
		isSuccess,
		error
	}

	const switchView = (view: 'login' | 'register') => {
		setView(view);
		setError(undefined);
	}

	return (
		<div className='auth' {...props}>
			<div className='auth__form'>
				<div className='auth__form-container'>
					<div className='auth__title'>
						<div onClick={() => switchView('login')} className={cn({ 'auth__title--active': (choicenView === 'login')})}>Вход </div>
						<div onClick={() => switchView('register')} className={cn({ 'auth__title--active': (choicenView === 'register') })}>Регистрация</div>
					</div>
					{choicenView === 'login' ? <AuthForm handler={onSubmitAuth} {...formProps}
						  />  : 
						<AuthForm handler={onSubmitRegistration} {...formProps}
						/>}
				</div>
			</div>
		</div>
	)
});