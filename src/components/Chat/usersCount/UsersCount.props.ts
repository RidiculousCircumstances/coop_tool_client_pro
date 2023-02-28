import { DetailedHTMLProps, HTMLAttributes } from 'react';

export type ThreeForms = [string, string, string];
export interface UsersCountProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	count: number,
	noun: ThreeForms,
}