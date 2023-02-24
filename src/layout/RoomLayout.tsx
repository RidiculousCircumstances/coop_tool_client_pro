import { Chat } from '../components/Chat/Chat'
import { MemberPopup } from '../components/RoomList/MemberPopup/MemberPopup'
import { RoomList } from '../components/RoomList/RoomList'
import { TopBar } from './Header/TopBar'
import { RoomLayoutProps } from './RoomLayout.props'
import './roomLayout.scss';

export const RoomLayout = ({ ...props }: RoomLayoutProps) => {
		return (
			<div className='room-layout'>
				<TopBar className='room-layout__header' 
					roomList={<RoomList />}
					chat={<Chat />} />
				<MemberPopup className='room-layout__members-popup' />
				<div className='room-layout__canvas'>
					Канвас
				</div>
				<div className='room-layout__tools'>
					Инструменты
				</div>
			</div>
		)
	}