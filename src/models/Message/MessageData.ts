export interface MessageData {
	messageId: number;
	userId: number;
	chatId: string;
	text: string;
	image: string | null;
	referencedMessage: number | null;
	nickname: string;
	created: string;
}