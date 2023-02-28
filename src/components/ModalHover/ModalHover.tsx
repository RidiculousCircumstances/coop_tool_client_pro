import { CONST } from '../../Const';
import { TextInput } from '../TextInput/TextInput';
import { Button } from '../Button/Button';
import { ModalProps } from './Modal.props';
import cn from 'classnames';
import './modal.scss';

export const ModalHover = ({ active, coord, className, children, ...props}: ModalProps): JSX.Element => {



	return (
		<div className={cn(className, 'modals', {'modals--active': active})} 
			style={{ top: coord?.y, left: coord?.x }} {...props}>
			{children}
		</div>
	)
}