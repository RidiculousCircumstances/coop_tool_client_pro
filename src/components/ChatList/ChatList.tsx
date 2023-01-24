import './chatList.scss';
import { ChatListProps } from './ChatList.props'
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import { useState } from 'react';
import { Input } from '../input/Input';


export const ChatList = ({...props}: ChatListProps): JSX.Element => {
	const [isActiveModal, setActiveModal] = useState<boolean>(true);



	return (
	<div className='chatList'>
			<Button className='chatList__room-button' appearence={'long'}>Комнаты</Button>
		<div className='chatList__main'>
				<div className='chatList__header'>
					<Button className='chatList__action-button' appearence={'small'}
						onClick={() => setActiveModal(true)}>New</Button>

					<Button className='chatList__action-button' appearence={'small'}
						onClick={() => setActiveModal(true)}>Join</Button>
				</div>
				<ul className='chatList__listContainer'>
					<li className='chatList__listItem'>
						<div className='chatList__chat'>Комната юных натуралистов</div>
						<div className='chatList__chat'>Три медведя</div>
					</li>
				</ul>
		</div>
			<Modal active={isActiveModal} setActive={setActiveModal} type='newChat' />
	</div>

	)
}