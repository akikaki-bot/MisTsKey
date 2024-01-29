import axios, { AxiosResponse } from "axios";
import { BaseMisTskeyError, MisTsKeyError } from "..";


/**
 * # HTTPClient
 * 
 * 従来 `posts/post.ts` にあったメゾットをクラス化したものです。
 * 
 * 従来の物よりもたぶん使いやすくなってます（しらんけど）
 */
//eslint-disable-next-line
export class HTTPClient {

	private baseUrl: string;
	constructor( baseUrl : string ) {
		this.baseUrl = baseUrl;
	}

	/**
	 * @type {T}
	 * 
	 * 
	 * 
	 * @summary
	 * **指定PATHに`POST`をします。**
	 * 
	 * @param {string} path ポストする先のPATH
	 * @param {T} data ポストするデータ
	 * @returns {Promise<AxiosResponse<any>>}
	 */
	//eslint-disable-next-line
	async POST<T>(path: string, data?: T): Promise<AxiosResponse<any>> {

		const url = new URL(`${this.baseUrl}${path}`).toString();
		return axios.post<T>(url, data)
			.catch((error) => {
				const Message = error.response.data.error;
				throw new MisTsKeyError(Message);
			});
	}

	/**
	 * @type {T}
	 * @type {R}
	 * 
	 * 
	 * 
	 * @summary
	 * **指定PATHに`POST`をし、そのあとに帰ってくるデータを`Promise<R>`で返します。**
	 * 
	 * @param {string} path POSTする先のURI
	 * @param {T} data POSTするデータ 
	 * 
	 * @returns {Promise<AxiosResponse<R, MisTsKeyError>>}
	 */
	async GETPOST<T, R>(path: string, data?: T): Promise<AxiosResponse<R, BaseMisTskeyError>> {
		const url = new URL(`${this.baseUrl}${path}`).toString();
		return axios.post<T, AxiosResponse<R, BaseMisTskeyError>>(url, data)
			.catch((error) => {
				const Message = error.response.data.error;
				throw new MisTsKeyError(Message);
			});
	}
}