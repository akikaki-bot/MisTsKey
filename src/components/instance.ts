import { Client } from "..";
import { Meta } from "../types";
import { ServerMeta } from "./serverMeta";


export class Instance {


	private client : Client;

	constructor(client ?: Client) {
		this.client = client;
	}

	async getMeta( detail : boolean = true): Promise<ServerMeta> {
		
		const data = await this.client.http.GETPOST<{ detail : boolean }, Meta>(
			"/api/meta", 
			{ detail : detail }
		);

		return new ServerMeta(
			data.data,
			this.client
		);
	}
}