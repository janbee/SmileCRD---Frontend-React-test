import { ajax } from "rxjs/ajax";
import { delay, map } from "rxjs/operators";
import { PractitionerModel } from "@interfaces/interfaces";

class ApiService {


	getPractitioners() {
		const url = `http://hapi.fhir.org/baseR4/Practitioner`;
		return ajax(url).pipe(
			delay(750),
			map((res) => {
				return res.response.entry.map((item: PractitionerModel) => {
					return {
						...item,
						resource: {
							...item.resource,
							photo: 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
						},
					} as PractitionerModel;
				});
			}),
			// mergeMap(() => throwError('error')),
		);
	}

	getPatient() {
		const url = `http://hapi.fhir.org/baseR4/Patient`;
		return ajax(url).pipe(
			map((res) => {
				return res.response.entry;
			}),
		);
	}
}

export const $ApiService = new ApiService();
