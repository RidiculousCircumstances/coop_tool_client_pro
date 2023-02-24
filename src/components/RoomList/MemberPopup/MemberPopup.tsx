import { observer } from 'mobx-react-lite';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../..';
import { NotifyPopup } from '../../NotifyPopup/NotifyPopup';
import { MemberPopupProps } from './MemberPopup.props';
import cn from 'classnames';
export const MemberPopup = observer(({className, ...props}: MemberPopupProps): JSX.Element => {
	const { roomStorage } = useContext(Context);
	const [activeJoinPopup, setActiveJoinPopup] = useState<boolean>(false);
	const [activeLeavePopup, setActiveLeavePopup] = useState<boolean>(false);
	const [nickname, setNickname] = useState<string>('');
	/**
	 * Управляет событием присоединения к комнате
	 */
	useEffect(() => {
		const user = roomStorage.getJoinedUser();
		if (!user) {
			return;
		}
		setActiveJoinPopup(true);
		setNickname(user.nickname);
		setTimeout(() => {
			setActiveJoinPopup(false);
		}, 4000);

	}, [roomStorage.lastJoined, roomStorage]);

	/**
	 * Управляет событием выхода из комнаты
	 */
	useEffect(() => {
		const user = roomStorage.getLeavedUser();
		if (!user) {
			return;
		}
		setActiveLeavePopup(true);
		setNickname(user.nickname);
		setTimeout(() => {
			setActiveLeavePopup(false);
		}, 3000);

	}, [roomStorage.lastLeaved, roomStorage]);

	return (
		<div className={cn(className)}>
			<NotifyPopup active={activeJoinPopup}>
				<span>{nickname} присоединился к комнате</span>
			</NotifyPopup>

			<NotifyPopup active={activeLeavePopup}>
				<span>{nickname} вышел из комнаты</span>
			</NotifyPopup>
		</div>
	)
})

