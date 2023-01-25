import './chatList.scss';
import { ChatListProps } from './ChatList.props'
import { Button } from '../Button/Button';
import { useState } from 'react';
import { Droptop } from '../Droptop/Droptop';
import { Input } from '../input/Input';
import { CONST } from '../../Const';
import cn from 'classnames';


export const ChatList = ({...props}: ChatListProps): JSX.Element => {
	const [isActiveDroptop, setActiveDroptop] = useState<boolean>(false);
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

	const droptopHandler = (type: 'new' | 'join' | null) => {
		
		return () => {

			if (isActiveDroptop && droptopType !== type) {
				setDroptopType(type);
			} else if (isActiveDroptop && droptopType === type) {
				setActiveDroptop(false)
				setDroptopType(null);
			} else {
				setActiveDroptop(isActiveDroptop ? false : true)
				setDroptopType(type);
			}

		}
	}


	return (
	<div className='chatList'>
			<Button className='chatList__room-button' appearence={'long'}>Комнаты</Button>
		<div className='chatList__main'>
				<div className='chatList__header'>
					
					<Button className={cn('chatList__action-button', 
						{ 'chatList__action-button--active': droptopType === 'new'})} appearence={'normal'}
						onClick={droptopHandler('new')}>New</Button>

					<Button className={cn('chatList__action-button',
						{ 'chatList__action-button--active': droptopType === 'join' })} appearence={'normal'}
						onClick={droptopHandler('join')}>Join</Button>
				</div>

				<Droptop active={isActiveDroptop}>
					<span className='chatList__droptop-text'>{droptopText}</span>
					<Input className='chatList__droptop-input' />
					<div className='chatList__droptop-button-container'>
						<Button className='chatList__droptop-button' appearence='small'>{droptopButtonLabel}</Button>
					</div>
					
				</Droptop>

				<ul className='chatList__listContainer'>
					<li className='chatList__listItem'>
						<div className='chatList__chat'>Комната юных натуралистов</div>
						<div className='chatList__chat'>Три медведя</div>
					</li>
				</ul>
		</div>
	</div>

	)
}