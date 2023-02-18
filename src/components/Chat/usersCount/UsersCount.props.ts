import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { RoomData } from '../../../models/Room/RoomData';

export interface UsersCountProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	count: number
}