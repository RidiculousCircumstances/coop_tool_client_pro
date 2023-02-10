import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { MessageData } from '../../../models/Message/MessageData';

export interface MessageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: MessageData,
	replyHandler: CallableFunction;
}