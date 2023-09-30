import { Note } from ".";
import { Client } from "..";




export class TypeofChannel<T>{

	private component : T;
	private client : Client;

	constructor(component : T , client ?: Client) {
		this.component = component;
		this.client = client;
	}

	host( host : string ) : boolean {
		if(
			this.component instanceof Note
		) {
			if(typeof this.component.uri === "undefined") return this.client.getHost === host;
			if(this.component.uri.includes("https://")) {
				const arr = this.component.uri.split("/");
				return arr[2] === host;
			}
		}
	}

	localOnly() : boolean {
		if(
			this.component instanceof Note
		) {
			return this.component.localOnly;
		} else {
			return false;
		}
	}
}