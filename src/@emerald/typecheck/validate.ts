/**
 * ## Emerald - BasedObject
 * 
 * 基礎となるオブジェクトのユーティリティー関数を実装している部分。
 * 
 */
export class BasedObject<T = unknown>{

	private _object : T ;

	constructor( object : T ) {
		this._object = object;
	}

	merge<U extends T>( value : U ) : T & U {
		return Object.assign(this._object , value);
	}

	mergeNullValue<U extends T , M extends keyof U>(value : M extends string ? M : never, newer : U[M] | null , isNull : U[M] ) : T & { [x: string]: U[M]; } {
		return Object.assign(this._object , newer !== null ? { [`${value}`] : newer } : { [`${value}`] : isNull });
	}

	mergeNullObject<U extends T>( value : U , isNull : U ) : T & U {
		return Object.assign(this._object , value ?? isNull );
	}

	remove( key : string ) {
		delete this._object[key];
		return this._object;
	} 

	get Object(){
		return this._object;
	}
}

/**
 * ## Emerald - ObjectVaildater
 * 
 * オブジェクトを正しい形へと導くエメラルドパッケージ。
 * 
 * `Emerald BasedObject`を親にしています。
 */
export class EmeraldObjectVaildater<T = unknown> extends BasedObject<T>{

	private defaultValue : T;

	constructor( object : T ){
		super(object);
		this.defaultValue = undefined;
	}

	default( value : T ) {
		this.defaultValue = value;
	}

	parse( value : T | undefined ) : T {
		return typeof value === "undefined" ? this.defaultValue : value;
	}
}

