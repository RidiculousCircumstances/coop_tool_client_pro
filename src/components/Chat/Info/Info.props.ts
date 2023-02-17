import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { RoomData } from '../../../models/Room/RoomData';

export interface InfoProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	data: RoomData,
}