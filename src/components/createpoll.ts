



export class CreatePoll {
	choices ?: Array<string>;
	multiple ?: boolean;
	expiresAt ?: number; 
	expiredAfter ?: number;

	constructor() {
		this.choices = [];
		this.multiple = false;
		this.expiresAt = null;
		this.expiredAfter = null;
	}

	addChoice(value : string) : this {
		this.choices.push(value);
		return this;
	}

	setMultiple(multiple : boolean = true) : this {
		this.multiple = multiple;
		return this;
	}

	setExpiresAt(expiresAt : Date) : this {
		const Date = expiresAt.getTime();
		this.expiresAt = Math.floor( Date / 1000 );
		return this;
	}

	setExpiresAfter( sec : number ) : this {
		this.expiredAfter = sec;
		return this;
	}

	toJSON() {
		return {
			choices : this.choices,
			multiple : this.multiple,
			expiresAt : this.expiresAt ?? null,
			expiredAfter : this.expiredAfter ?? null
		} as Poll;
	}
}

export interface Poll {
    choices : string[]
    multiple : boolean
    expiresAt : number | null
    expiredAfter : number | null
}