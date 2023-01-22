import './chatList.scss';
import { ChatListProps } from './ChatList.props'
import { Button } from '../Button/Button';


export const ChatList = ({...props}: ChatListProps): JSX.Element => {
	return (
	<div className='chatList'>
			<Button className='chatList__room-button '>Комнаты</Button>
		<div className='chatList__main'>
				<div className='chatList__header'>
					<Button className='chatList__action-button'>New</Button>
					<Button className='chatList__action-button'>Join</Button>
				</div>
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