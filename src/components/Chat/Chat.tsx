import { observer } from 'mobx-react-lite';
import { Input } from '../input/Input';
import { ChatProps } from './Chat.props';
import './chat.scss';

export const Chat = observer(({className, ...props}: ChatProps): JSX.Element => {

	return (
	<div className='chat'>
		<div className='chat__top-bar'>
			<div className='chat__name'>

			</div>

			<div className='chat__actions'>

			</div>
		</div>

		<div className='chat__container'>
			<ul></ul>
		</div>

		<div className='chat__bottom-bar'>

			<div className='chat__append-file-container'>
					<span className='chat__file-button'></span>
			</div>

			<Input className='chat__input' placeholder='Напишите сообщение...'/>

			<div className='chat__send-button-container'>
				<span className='chat__send-button'></span>
			</div>
			

		</div>
	</div>);
})