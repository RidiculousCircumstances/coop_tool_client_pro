import { RegistrationFormData } from './RegistrationFormInterface';

export interface AuthFormData extends Omit<RegistrationFormData, 'nickname'> {}