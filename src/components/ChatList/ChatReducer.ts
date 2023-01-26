import { ReducerAction, ReducerState } from 'react';
import { CONST } from '../../Const';

export interface FormContent {
	droptopText: string;
	droptopButtonLabel: string;
}

export interface ActionFormContent {
	type: 'join' | 'new',
	payload: FormContent;
}

export const actionFormContentReducer = (state: FormContent | null, action: ActionFormContent): FormContent | null => {

	switch (action.type) {

		case 'join':
			return {
				droptopText: CONST.DROPTOP_JOIN,
				droptopButtonLabel: CONST.DROPTOP_JOIN_BUTTON,
			}
		case 'new':
			return {
				droptopText: CONST.DROPTOP_NEW,
				droptopButtonLabel: CONST.DROPTOP_NEW_BUTTON,
			}
		default:
			return state;
	}
}