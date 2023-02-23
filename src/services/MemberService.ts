import { AxiosResponse } from 'axios';
import api from '../api/http';
import { Member } from '../models/Member/Member';

export class MemberService {
	static async getMember(id: number): Promise<AxiosResponse<Member>> {
		return await api.get<Member>(`user/${id}`);
	}
}