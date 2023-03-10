import { MouseEventHandler, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { RoomProps } from './Room.props';
import cn from 'classnames';
import './room.scss';
import { ModalHover } from '../../ModalHover/ModalHover';
import { CONST } from '../../../Const';
import { useClipboard } from 'use-clipboard-copy';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';

export const Room = observer(({room, activeRoom, setActiveRoom, className, ...props}: RoomProps):JSX.Element => {

	const [ShowRoomActionPopup, setShowRoomActionPopup] = useState<boolean>(false);
	const [roomActionPopupPosition, setRoomActionPopupPosition] = useState<{x: string, y: string} | null>(null);
	const [isHoveredRoom, setHoveredRoom] = useState<boolean>(false);
	const { roomStorage, userStorage } = useContext(Context);

	/**
	 * Библиотечных хук для получения доступа к буферу обмена
	 */
	const clipboard = useClipboard();

	/**
	 * Прослушка присоединяющихся пользователей
	 */
	useEffect(() => {
		
		if (activeRoom !== room.id) {
			return;
		}
		const listen = async () => {
			await roomStorage.listenJoin();			
		}
		listen();
	
	}, [roomStorage.lastJoined, roomStorage, activeRoom, room.id]);

	/**
	 * Прослушка покидающих комнату пользователей
	 */
	useEffect(() => {
		
		if (activeRoom !== room.id) {
			return;
		}
		const listen = async () => {
			await roomStorage.listenLeave();
		}
		listen();
	}, [roomStorage.lastLeaved, roomStorage, activeRoom, room.id]);

	/**
	 * Получение пользователей онлайн при входе в комнату
	 */
	useEffect(() => {
		if (activeRoom !== room.id) {
			return;
		}
		const listen =async () => {
			await roomStorage.setUsersOnline();
		}

		listen();

	}, [roomStorage.roomUsersData, roomStorage, activeRoom, room.id]);

	/**
	 * Устанавливает активную комнату
	 */
	const handleJoinRoom = () => {

		if (room.id !== activeRoom) {

			const userId = userStorage.userData?.id;
			if (!userId) {
				return;
			}
			
			roomStorage.setActiveRoom(room, userId);
			setActiveRoom(room.id);
		}
		
	}

	/**
	 * 
	 * @param e 
	 * Управляет контекстным меню с управлением комнатой
	 */
	const handleShowRoomActionsPopupOn = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		const coords = e.currentTarget.getBoundingClientRect();
		setTimeout(() => {
			setShowRoomActionPopup(true);
			setRoomActionPopupPosition({ x: `${coords.x}px`, y: `${coords.y}px` });
		}, 400)

	}

	const handleShowRoomActionsPopupOff = () => {
		
		setTimeout(() => {
			setShowRoomActionPopup(false);
		}, 400)
	

	}

	const handleRoomHover = () => {
		if (isHoveredRoom) {
			setHoveredRoom(false);
		} else {
			setHoveredRoom(true);
		}
	
	}

	const handleCopyLink = () => {
		const id = `${room.id}`;
		clipboard.copy(id);
	}


	return (
		<li key={room.id} className={cn('room', { 'room__room--active': activeRoom === room.id })}
			onMouseEnter={handleRoomHover} onMouseLeave={handleRoomHover}>
			<div key={`${room.id}-div`} className={cn(className, 'room__room')}
				{...props}>
				<span>{room.name}</span>
				
				<div key={`${room.id}-span`} className={cn('room__action-dots', {'room__action-dots--active': isHoveredRoom})}
					onMouseEnter={(e) => handleShowRoomActionsPopupOn(e)} onMouseLeave={ handleShowRoomActionsPopupOff }
					>
						...
					<ModalHover onMouseOver={(e) => handleShowRoomActionsPopupOn(e)} onMouseLeave={handleShowRoomActionsPopupOff} active={ShowRoomActionPopup} coord={roomActionPopupPosition} >
						<div className='room__modals'>
							
							<div onClick={handleCopyLink} className='room__modals-action'>{CONST.COPY_TEXT}</div>
							<div onClick={handleJoinRoom} className='room__modals-action'>{CONST.JOIN}</div>
							
						</div>
					</ModalHover>
				</div>
			</div>
		</li>
	);
})