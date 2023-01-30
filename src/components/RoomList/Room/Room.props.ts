import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { RoomData } from '../../../models/Room/RoomData';

export interface RoomProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	room: RoomData,
	activeRoom: string | null;
	setActiveRoom: CallableFunction;
}