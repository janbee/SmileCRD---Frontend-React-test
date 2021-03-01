export interface PractitionerModel {
	fullUrl: string;
	resource: {
		resourceType: string;
		id: string;
		meta: {
			versionId: string;
			lastUpdated: string;
			source: string;
		};
		identifier: {
			value: string;
		}[];
		name: {
			family: string;
			given: string[];
			prefix?: string[];
		}[];
		telecom: {
			system: string;
		}[];
		address: {
			line: string[];
			city: string;
			state: string;
			postalCode: string;
			country: string;
		}[];
		photo: string;
	};
	search: {
		mode: string;
	};
}


export interface PatientModel {
	fullUrl: string;
	resource: {
		resourceType: string;
		id: string;
		meta: {
			versionId: string;
			lastUpdated: string;
			source: string;
		};
		text: {
			status: string;
			div: string;
		};
		identifier: {
			use: string;
			system: string;
			value: string;
		}[];
		name: {
			family: string;
			given: string[];
		}[];
		telecom: {
			value: string;
			use: string;
		}[];
		gender: string;
		birthDate: string;
		address: {
			line: string[];
			city: string;
			state: string;
			postalCode: string;
			country: string;
		}[];
		managingOrganization: {
			reference: string;
			type: string;
		}
	};
	search: {
		mode: string;
	};
}





