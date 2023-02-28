import './roomList.scss';
import { RoomListProps } from './RoomList.props'
import { Button } from '../Button/Button';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Droptop } from '../Droptop/Droptop';
import { TextInput } from '../TextInput/TextInput';
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
				setActiveRoomActions(false);
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
			<Droptop contentStyleActive='roomList__droptop-content' containerStyleActive='roomList__droptop-container'
					 className={cn('roomList__droptop')} active={isActiveRoomsMenu}>

				
				<div className='roomList__main'>
					<div>
						<div className='roomList__header'>
							<Button className={cn('roomList__action-button',
								{ 'roomList__action-button--active': isActiveRoomActions && droptopType === 'new' })} appearence={'normal'}
								onClick={roomsActionHandler('new')}>Create</Button>

							<Button className={cn('roomList__action-button',
								{ 'roomList__action-button--active': isActiveRoomActions && droptopType === 'join' })} appearence={'normal'}
								onClick={roomsActionHandler('join')}>Join</Button>
						</div>
						<div className='roomList__chats-action-menu'>
							<Droptop className='roomList__droptop-chats-action-menu roomList__droptop-no-border-radius' active={isActiveRoomActions}>
								<div className='roomList__chats-action-wrapper'>
									<div className='roomList__droptop-chats-button-container'>
										<Button className='roomList__droptop-chats-button'
											appearence='small' onClick={handleRoomsActionButton(droptopType)}>{droptopButtonLabel}</Button>
									</div>
									<TextInput className='roomList__droptop-chats-input' value={roomData} onChange={handleRoomInput} />
									<span className='roomList__droptop-chats-text'>{droptopText}</span>
								</div>
							</Droptop>
						</div>
						<ul className='roomList__listContainer'>
							{rooms()}
						</ul>
					</div>
						
				</div>
		</Droptop>
			
	</div >

	)
})