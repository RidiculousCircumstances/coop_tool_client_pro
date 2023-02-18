import { CONST } from '../../../Const';
import { UsersCountProps } from './UsersCount.props';
import plural from 'plural-ru';

export const UsersCount = ({ className, count, ...props }: UsersCountProps): JSX.Element => {

	const usersNoun = plural(count, ...CONST.USERS);

	return (
		<div className={className}>
			<span>{count} </span>
			<span> {usersNoun} </span>
		</div> 
		)
		
}