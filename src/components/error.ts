type uuid = string

export interface BaseMisTskeyError {
    message: string
    code: string,
    id: uuid,
    kind: string,
}

export class MisTsKeyError extends Error implements BaseMisTskeyError {
    message: string
    code: string
    id: string
    kind: string

    constructor( config : BaseMisTskeyError ) {
        super(`[${config.code}] \n ${config.message} \n uuid : ${config.id} / kind : ${config.kind}`)
    }
}