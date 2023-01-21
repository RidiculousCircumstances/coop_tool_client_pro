import { DetailedHTMLProps, HTMLAttributes} from 'react';
import { AuthFormData } from '../AuthFormInterface';
import { RegistrationFormData } from '../RegistrationFormInterface';



export interface AuthFormProps extends DetailedHTMLProps< HTMLAttributes<HTMLDivElement>, HTMLDivElement> { 
	type: 'login' | 'register',
	handler:  (formData: AuthFormData | RegistrationFormData) => Promise<void>,
	error: number | undefined,
	isSuccess: boolean
}