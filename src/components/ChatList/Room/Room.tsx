import { MouseEventHandler, useRef, useState } from 'react';
import { RoomProps } from './Room.props';
import cn from 'classnames';
import './room.scss';
import { ModalHover } from '../../Modal/ModalHover';

export const Room = ({room, activeRoom, setActiveRoom, className, ...props}: RoomProps):JSX.Element => {

	const [showModal, setShowModal] = useState<boolean>(false);
	const [modalPosition, setModalPosition] = useState<{x: string, y: string} | null>(null);

	const modalParent = useRef<HTMLSpanElement>(null);
	const modalCoordRect = modalParent.current?.getClientRects()[0];
	const handleActiveRoom = () => {
		
		setActiveRoom(room.id);
	}

	const handleShowPopup = () => {
		if (showModal) {
			setShowModal(false);
			setModalPosition(null);
		} else {
			setModalPosition({ x: `${modalCoordRect?.x}px`, y: `${modalCoordRect?.y}px` });
			setShowModal(true);
		}
	}

	return (
		<li key={room.id} className={cn('room', { 'room__room--active': activeRoom === room.id })}
			onClick={handleActiveRoom}>
			<div key={`${room.id}-div`} className={cn(className, 'room__room')}
				{...props}>
				<span>{room.name}</span>
				
				<span ref={modalParent} key={`${room.id}-span`} className='room__action-dots' onMouseEnter={handleShowPopup}
					onMouseLeave={handleShowPopup}>...</span>

				<ModalHover active={showModal} coord={modalPosition} >
					<div className='room__action-modals'>
						<span>{room.id}</span>
					</div>
					
				</ModalHover>
				
			</div>
		</li>
	);
}