import { MessageProps } from './Message.props';
import './message.scss';
import cn from 'classnames';
import { CSSProperties, useContext } from 'react';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';
import { Style } from 'util';

export const Message = observer(({className, data, ...props}: MessageProps): JSX.Element => {

	const date = new Date(data.created);

	const time = `${date.toLocaleTimeString('ru-RU', { timeZone: 'Asia/Barnaul', timeStyle: 'short' })} ${date.toLocaleDateString('ru-RU')}`

	const { userStorage } = useContext(Context);
	const senderId = userStorage.userData?.id;


	const images = (images: string[]): JSX.Element[] => {

		const imgCount = images.length;

		const size = (count: number): CSSProperties => {
			let height = imgCount === 2 ? (248 / 2) : (248 / (imgCount - 1));

			return {
				width: (442 / (count - 1)),
				height
			}
		}

		return images.map((image, index) => {
			
			let firstImgSize: CSSProperties | null = null;
			if (index === 0 && imgCount > 2) {
				firstImgSize = {
					width: '100%',
					height: '100%'
				}
			}
			
			return (
				<img style={index === 0 && firstImgSize ? firstImgSize : size(imgCount)}
				 key={image} src={image} alt={image} className={cn('message__image-item', 
				{ 'message__image-item--half': imgCount === 2 },
						 { 'message__image-item--rest': imgCount > 2 }
				)} />
			)
		})
		

		

	}
	return (
		<div className={cn(className, 'message')}   {...props}>

			<div className='message_user-avatar'>
				{}
			</div>


			<div className='message__container'>
				<div className='message__title'>
					<div className={cn('message__user-name', 
						{ 'message__user-name--our': senderId === data.userId })}>
						{data.nickname}
					</div>

					<div className='message__time'>
						{time}
					</div>
				</div>
				
				<div className='message__body'>
					{data.text}
				</div>


				{data.images && 
					<div className={cn('message__image-container'
						)}>
						{data.images.length === 1 && 
							<img src={data.images[0]} alt={data.images[0]} className='message__image' />
						}
						{
						data.images.length > 1 &&
							images(data.images)
						}
					</div>
				}

			</div>

		</div>
	)
})