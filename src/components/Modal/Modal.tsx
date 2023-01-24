import { CONST } from '../../Const';
import { Input } from '../input/Input';
import { Button } from '../Button/Button';
import { ModalProps } from './Modal.props';
import cn from 'classnames';
import './modal.scss';

export const Modal = ({ active, children, setActive, type, ...props}: ModalProps): JSX.Element => {

	let buttonLable = '';
	let modalText = '';

	if (type === 'newChat') {
		buttonLable = CONST.MODAL_NEW_BUTTON;
		modalText = CONST.MODAL_NEW
	} else if(type === 'joinChat') {
		buttonLable = CONST.MODAL_JOIN_BUTTON;
		modalText = CONST.MODAL_JOIN
	} else {
		throw new Error ('Unknown modal type');
	}



	return (
		<div className={cn('modals', { 'modals--active': active })} onClick={() => setActive(false)}>
			<div className={cn('modals__form', { 'modals__form--active': active })}
				 onClick={(e) => e.stopPropagation()}>
				<span className='modals__text'>{ modalText }</span>
				<Input className='modals__input' autoComplete='off'/>
				<Button className='modals__button' appearence='large'
					onClick={() => { }}>{ buttonLable }</Button>
			</div>
		</div>
	)
}