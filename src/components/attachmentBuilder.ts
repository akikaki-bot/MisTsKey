//import { Client } from "..";
import { readFileSync } from "fs";

type PsBfResolve = string | Buffer;

export class CreateAttachment {


	private __file : { file : Buffer } & uploadConfig;
	
	constructor() {

	}

	/**
	 * # set
	 * 
	 * 画像もしくは添付するファイルをセットします。
	 * 
	 * @param {PsBfResolve} data ファイルのパス もしくは Buffer
	 * @returns {Promise<string>} アップロードされた画像のID
	 */
	set( data: PsBfResolve , config ?: uploadConfig ) : this {

		if( data instanceof Buffer ) {
			this.__file =  {
				file : data,
				...config
			};
		} else {
			const file = readFileSync( data );
			this.__file = {
				file : file,
				...config
			};
		}

		return this;
	}

	toObject() : { file : Buffer } & uploadConfig {
		return this.__file;
	}
}

export interface uploadConfig {
	name ?: string | null
	comment ?: string | null
	isSensitive ?: boolean
	force ?: boolean
}

