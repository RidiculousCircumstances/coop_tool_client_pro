import { ReactNode } from 'react';

export interface RoomLayoutProps {
	roomList?: React.ReactNode;
	chat?: React.ReactNode;
	canvas?: React.ReactNode;
	toolbar?: React.ReactNode;
	logo?: React.ReactNode;
	auth?: React.ReactNode;
}
