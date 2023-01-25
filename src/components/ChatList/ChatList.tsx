import './chatList.scss';
import { ChatListProps } from './ChatList.props'
import { Button } from '../Button/Button';
import { useState } from 'react';
import { Droptop } from '../Droptop/Droptop';
import { Input } from '../input/Input';
import { CONST } from '../../Const';
import cn from 'classnames';


export const ChatList = ({...props}: ChatListProps): JSX.Element => {
	const [isActiveChatActions, setActiveChatActions] = useState<boolean>(false);
	const [isActiveRoomsMenu, setActiveRoomsMenu] = useState<boolean>(false);
	const [droptopType, setDroptopType] = useState<'new' | 'join' | null>(null);


	let droptopText = '';
	let droptopButtonLabel = '';
	if (droptopType === 'join') {
		droptopText = CONST.DROPTOP_JOIN;
		droptopButtonLabel = CONST.DROPTOP_JOIN_BUTTON;
	} else if (droptopType === 'new') {
		droptopText = CONST.DROPTOP_NEW;
		droptopButtonLabel = CONST.DROPTOP_NEW_BUTTON;
	}

	const chatActionsHandler = (type: 'new' | 'join' | null) => {
		
		return () => {

			if (isActiveChatActions && droptopType !== type) {
				setDroptopType(type);
			} else if (isActiveChatActions && droptopType === type) {
				setActiveChatActions(false)
				setDroptopType(null);
			} else {
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
						<Input className='chatList__droptop-chats-input' />
						<div className='chatList__droptop-chats-button-container'>
							<Button className='chatList__droptop-chats-button' appearence='small'>{droptopButtonLabel}</Button>
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
}