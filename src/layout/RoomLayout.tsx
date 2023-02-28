import { Chat } from '../components/Chat/Chat'
import { MemberPopup } from '../components/RoomList/MemberPopup/MemberPopup'
import { RoomList } from '../components/RoomList/RoomList'
import { TopBar } from './Header/TopBar'
import { RoomLayoutProps } from './RoomLayout.props'
import './roomLayout.scss';

export const RoomLayout = ({ roomList, chat, canvas, toolbar, auth, ...props }: RoomLayoutProps) => {
		return (
			<div className='room-layout'>
				<TopBar className='room-layout__header' 
					roomList={roomList}
					chat={chat} />
				<MemberPopup className='room-layout__members-popup' />
				<div className='room-layout__canvas'>
					{canvas}
				</div>
				<div className='room-layout__tools'>
					{toolbar}
				</div>
				<div className='room-layout__auth'>
					{auth}
				</div>
			</div>
		)
	}