import { ReferencedMessageProps } from './ReferencedMessage.props';
import { useContext } from 'react';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';
import { CONST } from '../../../Const';
import cn from 'classnames';


export const ReferencedMessage = observer(({ className, refId, type,
	setActive, ...props }: ReferencedMessageProps): JSX.Element => {

	const { chatStorage } = useContext(Context);

	const msgData = chatStorage.getMessageById(refId);
	const referencedMessage = msgData ? msgData[0] : null;

	const maxLength = CONST.TAGGED_MESSAGE_LENGTH;

	let cutText = null;
	if (referencedMessage && referencedMessage.text.length > maxLength) {
		cutText = referencedMessage?.text.slice(0, maxLength) + '...';
	}

	/**
	 * 
	 * @returns 
	 * Скроллит на высоту тегнутого сообщения
	 */
	const handleGoToRefMsg = () => {
		const taggedRef = referencedMessage?.ref;
		const refMessage = taggedRef?.current;
		const container = chatStorage.chatContainerRef?.current;
		if (!taggedRef || type !== 'read' || !refMessage || !container) {
			return;
		}

		container.scroll({ top: (refMessage.offsetTop - 80)});
		const classList = refMessage.classList;
		classList.add('chat__tagged');
		setTimeout(() => {
			classList.remove('chat__tagged');
		}, 4000);
	}
	
	const refImg = referencedMessage?.images?.length ? true : false;
	return (

		<div className={cn(className, 'chat__tagged-message-container', 
		{'chat__tagged-message-container--read': type === 'read'})}
			onClick={handleGoToRefMsg}
			 {...props}>
			{referencedMessage &&
			<>
				{type === 'send' && setActive && 
				<div className='chat__close-button chat__tagged-message-close-button icon'
						onClick={() => setActive(null)} />}
				<div className="chat__border" />
				<div className='chat__tagged-message-sender'>{referencedMessage.nickname}</div>
				<div className='chat__tagged-message-cut-text'>
						{cutText ?? referencedMessage.text}
				</div>
				{refImg &&
				<div className='chat__image-title'>
					Изображение
				</div>
				}
			</>
			}
		</div>

	)
		
})