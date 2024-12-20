export interface IUser {
	id: number
	name: string
	username?: string
	email: string
	address?: {
		street: string
		suites: string
		city: string
		zipcode: string
		geo: {
			lat: string
			lng: string
		}
	}
	phone?: string
	website: string
	company: {
		name: string
		catchPhrase?: string
		bs?: string
	}
}

export interface ICreateUser {
	id: number
	name: string
	email: string
	website: string
	company: {
		name: string
	};
}