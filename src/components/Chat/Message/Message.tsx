import { MessageProps } from './Message.props';
import './message.scss';
import cn from 'classnames';

export const Message = ({className, data, ...props}: MessageProps): JSX.Element => {

	const date = new Date(data.created);
	const time = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`

	return (
		<div className={cn(className, 'message')}   {...props}>


			
			<div className='message_user-avatar'>
				{}
			</div>


			<div className='message__container'>
				<div className='message__title'>
					<div className='message__user-name'>
						{data.nickname}
					</div>

					<div className='message__time'>
						{time}
					</div>
				</div>
				
				<div className='message__body'>
					{data.text}
				</div>
			</div>

			
			

			

			{ data.image ?? <div className='message__image'>
				{data.image}
			</div>}

		</div>
	)
}