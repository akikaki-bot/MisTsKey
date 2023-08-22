type uuid = string

export interface BaseMisTskeyError {
    message: string
    code: string,
    id: uuid,
    kind: string,
    info : {
        param : string
        reason : string
    }
}

export class MisTsKeyError extends Error {
	constructor( config : BaseMisTskeyError ) {
		super(`[${config.code ?? "Unknown Code"}] \n ${config.message ?? "Unknown Error"} \n ${config.info.param ?? "Unknown param"} <- ${config.info.reason ?? "Unknown Reason"} \n uuid : ${config.id ?? "Unknown UUID"} / kind : ${config.kind ?? "Unknown Kind"}`);
	}
}