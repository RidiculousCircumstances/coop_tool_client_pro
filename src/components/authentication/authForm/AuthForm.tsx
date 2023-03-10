import { useForm } from 'react-hook-form';
import { CONST } from '../../../Const';
import { Button } from '../../Button/Button';
import { TextInput } from '../../TextInput/TextInput'
import { RegistrationFormData } from '../RegistrationFormInterface';
import { AuthFormProps } from './AuthForm.props'

export const AuthForm = ({ type, handler, error, isSuccess, ...props  }: AuthFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegistrationFormData>();
	
	return (
		<form className='auth__form-module' onSubmit={handleSubmit(handler)}>
			<div className='auth__input_wrapper'>
				<TextInput {...register('email', {
					required: {
						value: true,
						message: 'Поле email не должно быть пустым'
					}
				})}
					placeholder="email" type="email"
					error={errors.email} />

				{type === 'register' && 
					<TextInput {...register('nickname', {
						required: {
							value: true,
							message: 'Поле nickname не должно быть пустым'
						}
					})}
						placeholder="Имя" type="text"
						error={errors.nickname} />
				}

				<TextInput {...register('password', {
					required: {
						value: true,
						message: 'Поле password не должно быть пустым'
						 
					}
				})}
					placeholder="Пароль минимум 8 символов" type="password"
					minLength={8}
					error={errors.password}
					 />

				{type === 'login' && <TextInput disabled />}
				<div>
					{(errors.email || (type === 'register' && errors.nickname) || errors.password) && <div className='auth__error'>{CONST.EMPTY_FIELD_ERROR}</div>}
					{(error === 400) && <div className='auth__error'>{CONST.ALREADY_EXISTS_ERROR}</div>}
					{(error === 401) && <div className='auth__error'>{CONST.AUTH_ERROR}</div>}
				</div>
			</div>
			<Button className='auth__button' appearence={'large'}>OK</Button> 
		</form>

	)
}