type uuid = string

export interface BaseMisTskeyError {
    message: string
    code: string,
    id: uuid,
    kind: string,
}

export class MisTsKeyError extends Error {
    constructor( config : BaseMisTskeyError ) {
        super(`[${config.code ?? "Unknown Code"}] \n ${config.message ?? "Unknown Error"} \n uuid : ${config.id ?? "Unknown UUID"} / kind : ${config.kind ?? "Unknown Kind"}`)
    }
}