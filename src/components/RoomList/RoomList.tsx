import './roomList.scss';
import { RoomListProps } from './RoomList.props'
import { Button } from '../Button/Button';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Droptop } from '../Droptop/Droptop';
import { Input } from '../input/Input';
import { CONST } from '../../Const';
import cn from 'classnames';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import { Room } from './Room/Room';

export type ActionRoomMenuType = 'new' | 'join' | null;

export const RoomList = observer(({className, ...props}: RoomListProps): JSX.Element => {
	
	const [isActiveRoomActions, setActiveRoomActions] = useState<boolean>(false);
	const [isActiveRoomsMenu, setActiveRoomsMenu] = useState<boolean>(false);
	const [droptopType, setDroptopType] = useState<ActionRoomMenuType>(null);
	const [roomData, setRoomData] = useState<string>('');
	const [activeRoom, setActiveRoom] = useState<string | null>(null);

	const { roomStorage } = useContext(Context);
	
	let droptopText = '';
	let droptopButtonLabel = '';
	if (droptopType === 'join') {
		droptopText = CONST.DROPTOP_JOIN;
		droptopButtonLabel = CONST.DROPTOP_JOIN_BUTTON;
	} else if (droptopType === 'new') {
		droptopText = CONST.DROPTOP_NEW;
		droptopButtonLabel = CONST.DROPTOP_NEW_BUTTON;
	}

	const roomsActionHandler = (type: ActionRoomMenuType) => {
		
		return () => {

			if (isActiveRoomActions && droptopType !== type) {
				setRoomData('');
				setDroptopType(type);
			} else if (isActiveRoomActions && droptopType === type) {
				setActiveRoomActions(false)
				setDroptopType(null);
			} else {
				setRoomData('');
				setActiveRoomActions(isActiveRoomActions ? false : true)
				setDroptopType(type);
			}

		}
	}

	const roomsMenuHandler = () => {
		if (isActiveRoomsMenu) {
			setActiveRoomActions(false);
			setDroptopType(null);
			setActiveRoomsMenu(false);
		} else {
			setActiveRoomsMenu(true);
		}
	}


	/**
	 * Инпут акшнов комнат
	 * @param e 
	 */
	const handleRoomInput = (e: ChangeEvent<HTMLInputElement>) => {
		setRoomData(e.target.value);
	}

	/**
	 * Управление кнопками присоединения/создания комнат
	 * @param type 
	 * @returns 
	 */
	const handleRoomsActionButton = (type: ActionRoomMenuType) => {
	
		return () => {

			if (type === 'join') {
				roomStorage.addRoom(roomData);
			} else if (type === 'new') {
				roomStorage.createRoom({name: roomData });
			}
		}

	}


	useEffect (() => {
		roomStorage.getRooms();
	}, [roomStorage.rooms, roomStorage]);

	const rooms = (): JSX.Element[] | JSX.Element => {
		const rooms = roomStorage.rooms;
		if (rooms.length) {
			return rooms.map((room) => {
				return (
					<Room key={`${room.id}-room`} activeRoom={activeRoom} setActiveRoom={setActiveRoom} room={room} />
				)

			});
		} else {
			return (<div className='room__empty'>Добавьте комнату</div>)
		}

	}


	return (
		<div className={cn(className, 'roomList')}>
			<Button className={cn('roomList__room-button', 
			{ 'roomList__room-button--active': isActiveRoomsMenu })} 
			appearence={'long'} onClick={roomsMenuHandler}>
				Комнаты
			</Button>
		<Droptop className='roomList__droptop' active={isActiveRoomsMenu}>

			<div className='roomList__main'>
				<div className='roomList__header'>
					<Button className={cn('roomList__action-button',
						{ 'roomList__action-button--active': droptopType === 'new' })} appearence={'normal'}
						onClick={roomsActionHandler('new')}>New</Button>

					<Button className={cn('roomList__action-button',
						{ 'roomList__action-button--active': droptopType === 'join' })} appearence={'normal'}
						onClick={roomsActionHandler('join')}>Join</Button>
				</div>
		
					<div className='roomList__chats-action-menu'>
					<Droptop className='roomList__droptop-chats-action-menu roomList__droptop-no-border-radius' active={isActiveRoomActions}>
						<span className='roomList__droptop-chats-text'>{droptopText}</span>
						<Input className='roomList__droptop-chats-input' value={roomData} onChange={handleRoomInput}/>
						<div className='roomList__droptop-chats-button-container'>
							<Button className='roomList__droptop-chats-button' 
									appearence='small' onClick={handleRoomsActionButton(droptopType)}>{droptopButtonLabel}</Button>
						</div>
					</Droptop>
				</div>
	
	
				<ul className='roomList__listContainer'>
						{rooms()}
				</ul>
				

			</div>
		</Droptop>
			
	</div >

	)
})