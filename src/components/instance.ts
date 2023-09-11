import { Client } from "..";
import { GETPOST } from "../posts";
import { Meta } from "../types";
import { ServerMeta } from "./meta";


export class Instance {


	private client : Client;

	constructor(client ?: Client) {
		this.client = client;
	}

	async getMeta( detail : boolean = true): Promise<ServerMeta> {
		
		const data = await GETPOST<{ detail : boolean }, Meta>(
			`https://${this.client.getHost}/api/meta`, 
			{ detail : detail }
		);

		return new ServerMeta(
			data.data,
			this.client
		);
	}
}