export interface MessageData {
	messageId: number;
	userId: number;
	chatId: string;
	text: string;
	images: string[] | null;
	referencedMessage: number | null;
	nickname: string;
	created: string;
	ref?: React.RefObject<HTMLDivElement>;
}