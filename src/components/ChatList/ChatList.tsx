import './chatList.scss';
import { ChatListProps } from './ChatList.props'
import { Button } from '../Button/Button';
import { ChangeEvent, useContext, useState } from 'react';
import { Droptop } from '../Droptop/Droptop';
import { Input } from '../input/Input';
import { CONST } from '../../Const';
import cn from 'classnames';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';

export type ActionRoomMenuType = 'new' | 'join' | null;

export const ChatList = observer(({...props}: ChatListProps): JSX.Element => {
	const [isActiveChatActions, setActiveChatActions] = useState<boolean>(false);
	const [isActiveRoomsMenu, setActiveRoomsMenu] = useState<boolean>(false);
	const [droptopType, setDroptopType] = useState<ActionRoomMenuType>(null);
	const [roomData, setRoomData] = useState<string>('');

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

	const chatActionsHandler = (type: ActionRoomMenuType) => {
		
		return () => {

			if (isActiveChatActions && droptopType !== type) {
				setRoomData('');
				setDroptopType(type);
			} else if (isActiveChatActions && droptopType === type) {
				setActiveChatActions(false)
				setDroptopType(null);
			} else {
				setRoomData('');
				setActiveChatActions(isActiveChatActions ? false : true)
				setDroptopType(type);
			}

		}
	}

	const roomsMenuHandler = () => {
		if (isActiveRoomsMenu) {
			setActiveChatActions(false);
			setDroptopType(null);
			setActiveRoomsMenu(false);
		} else {
			setActiveRoomsMenu(true);
		}
	}


	const handleRoomInput = (e: ChangeEvent<HTMLInputElement>) => {
		setRoomData(e.target.value);
	}

	const handleRoomButton = (type: ActionRoomMenuType) => {
	
		return () => {

			if (type === 'join') {
	
				roomStorage.addRoom(roomData);
			} else if (type === 'new') {
				roomStorage.createRoom({name: roomData });
			}
		}

	}

	return (
	<div className='chatList'>
			<Button className={cn('chatList__room-button', 
					{ 'chatList__room-button--active': isActiveRoomsMenu })} 
					appearence={'long'} onClick={roomsMenuHandler}>Комнаты</Button>
			<Droptop className='chatList__droptop' active={isActiveRoomsMenu}>

			<div className='chatList__main'>
				<div className='chatList__header'>
					<Button className={cn('chatList__action-button',
						{ 'chatList__action-button--active': droptopType === 'new' })} appearence={'normal'}
						onClick={chatActionsHandler('new')}>New</Button>

					<Button className={cn('chatList__action-button',
						{ 'chatList__action-button--active': droptopType === 'join' })} appearence={'normal'}
						onClick={chatActionsHandler('join')}>Join</Button>
				</div>
		
					<div className='chatList__chats-action-menu'>
					<Droptop className='chatList__droptop-chats-action-menu' active={isActiveChatActions}>
						<span className='chatList__droptop-chats-text'>{droptopText}</span>
						<Input className='chatList__droptop-chats-input' value={roomData} onChange={handleRoomInput}/>
						<div className='chatList__droptop-chats-button-container'>
							<Button className='chatList__droptop-chats-button' 
									appearence='small' onClick={handleRoomButton(droptopType)}>{droptopButtonLabel}</Button>
						</div>
					</Droptop>
				</div>
	
	
				<ul className='chatList__listContainer'>
					<li className='chatList__listItem'>
						<div className='chatList__chat'>Комната юных натуралистов</div>
						<div className='chatList__chat'>Три медведя</div>
					</li>
				</ul>

			</div>
		</Droptop>
			
	</div >

	)
})