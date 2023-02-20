import { action, makeObservable, observable } from 'mobx';
import { Gateway } from '../services/gateway/Gateway';

export class Storage {

	@observable
	protected static gateway: Gateway | null = null;

	constructor () {
		makeObservable(this);
	}

	@action
	public static setSocket(gateway: Gateway) {
		this.gateway = gateway;
	}
}