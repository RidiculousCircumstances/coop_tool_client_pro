import { ThreeForms } from './components/Chat/usersCount/UsersCount.props';

export const CONST = {
	SOCKET_URL: 'ws://83.246.208.128:5000',
	HTTPURL: 'http://83.246.208.128:5000',
	CLIENTURL: 'http://83.246.208.128:3000',
	EMPTY_FIELD_ERROR: '*Заполните обязательные поля',
	ALREADY_EXISTS_ERROR: '*Пользователь с таким email уже существует',
	AUTH_ERROR: '*Введен неправильный логин или пароль',
	BACK: 'Назад',
	DROPTOP_NEW: 'Введите название комнаты',
	DROPTOP_NEW_BUTTON: 'Создать',
	ONLINE: 'онлайн',
	DROPTOP_JOIN: 'Введите id комнаты',
	DROPTOP_JOIN_BUTTON: 'Присоединиться',
	COPY_TEXT: 'Копировать id комнаты',
	JOIN: 'Войти',
	USERS: ['участник', 'участника', 'участников'] as ThreeForms,
	INFO: 'Информация',
	CHAT: 'Беседа',
	CHOOSE_ROOM: 'Выберите комнату',
	CREATED: 'cоздано',
	MEMBERS: 'Участники',
	EMPTY_ROOM: 'Здесь пока что ничего нет...',


	ALLOWED_FILES: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
	TAGGED_MESSAGE_LENGTH: 20,
}