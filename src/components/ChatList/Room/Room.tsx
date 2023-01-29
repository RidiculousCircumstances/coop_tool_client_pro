import { MouseEventHandler, useCallback, useContext, useRef, useState } from 'react';
import { RoomProps } from './Room.props';
import cn from 'classnames';
import './room.scss';
import { ModalHover } from '../../ModalHover/ModalHover';
import { CONST } from '../../../Const';
import { useClipboard } from 'use-clipboard-copy';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';

export const Room = observer(({room, activeRoom, setActiveRoom, className, ...props}: RoomProps):JSX.Element => {

	const [showModal, setShowModal] = useState<boolean>(false);
	const [modalPosition, setModalPosition] = useState<{x: string, y: string} | null>(null);
	const [isHovered, setHovered] = useState<boolean>(false);
	const { roomStorage, userStorage } = useContext(Context);


	const clipboard = useClipboard();

	const handleJoinRoom = () => {
		if (room.id !== activeRoom) {
			const userId = userStorage.userData?.id;
			roomStorage.setActiveRoom(room, userId!);
			roomStorage.listenRoom();
			setActiveRoom(room.id);
		}
		
	}

	const handleShowPopupOn = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		const coords = e.currentTarget.getBoundingClientRect();
		setTimeout(() => {
			setShowModal(true);
			setModalPosition({ x: `${coords.x}px`, y: `${coords.y}px` });
		}, 400)

	}

	const handleShowPopupOff = () => {
		
		setTimeout(() => {
			setShowModal(false);
		}, 400)
	

	}

	const handleRoomHover = () => {
		if (isHovered) {
			setHovered(false);
		} else {
			setHovered(true);
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
				
				<div key={`${room.id}-span`} className={cn('room__action-dots', {'room__action-dots--active': isHovered})}
					onMouseEnter={(e) => handleShowPopupOn(e)} onMouseLeave={ handleShowPopupOff }
					>
						...
					<ModalHover onMouseOver={(e) => handleShowPopupOn(e)} onMouseLeave={handleShowPopupOff} active={showModal} coord={modalPosition} >
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