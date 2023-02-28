import { CONST } from '../../../Const';
import { UsersCountProps } from './UsersCount.props';
import plural from 'plural-ru';

export const UsersCount = ({ className, count, noun, ...props }: UsersCountProps): JSX.Element => {

	const usersNoun = plural(count, ...noun);

	return (
		<div className={className}>
			<span>{count} </span>
			<span> {usersNoun} </span>
		</div> 
		)
		
}