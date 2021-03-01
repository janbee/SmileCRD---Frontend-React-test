import React, { forwardRef, memo, useCallback, useRef, useState } from 'react';
import './practitioner.component.scss';
import { useRxEffect } from "@utilities/utils";
import { $ApiService } from "@services/api.service";
import { Dimmer, Icon, Input, Loader } from "semantic-ui-react";
import { cloneDeep } from "lodash";
import { PatientModel, PractitionerModel } from "@interfaces/interfaces";
import { PractitionerCardComponent } from "@components/practitioner-card/practitioner-card.components";
import {
	PractitionerCardModalComponent,
	Ref as PractitionerCardModalComponentRef,
} from "@components/practitioner-card/practitioner-card-modal.components";


interface Props {
}

interface State {
	loading: boolean;
	practitionerSource: PractitionerModel[];
	practitionerList: PractitionerModel[];
	patientList: PatientModel[];

}

export interface Ref {
}

const initialState = (props: Props) => {
	return {
		loading: false,
		practitionerSource: [],
		practitionerList: [],
		patientList: [],
	};
};

export const PractitionerComponent = memo(
	forwardRef<Ref, Props>((props, ref) => {
		const [state, setState] = useState<State>(initialState(props));
		const searchByName = useRef<HTMLInputElement>(null);
		const CardModal = useRef<PractitionerCardModalComponentRef>(null);

		useRxEffect(() => {
			setState(prevState => ({...prevState, loading: true}));
			return $ApiService.getPractitioners().subscribe(res => {
				const practitionerList = cloneDeep(res);
				const practitionerSource = cloneDeep(res);
				setState(prevState => ({...prevState, loading: false, practitionerList, practitionerSource}));
			}, () => {
				setState(() => {
					throw new Error('error');
				});
			});
		}, []);


		const handleFilterChange = useCallback(() => {
			const searchName = (searchByName.current?.value || '').toLowerCase();

			const practitionerList = cloneDeep(state.practitionerSource).filter((item) => {
				const name = !!item.resource.name[0].given
					? `${item.resource.name[0].given} ${item.resource.name[0].family}`
					: item.resource.name[0].family;

				return name.toLowerCase().includes(searchName);
			});

			setState(prevState => ({...prevState, practitionerList}));
		}, [state]);


		const handleOpenModal = useCallback((item) => {
			return () => {
				console.log('gaga-------------------------------------', item);
				CardModal.current?.show(item);
			};
		}, []);


		const handleDelete = useCallback((card) => {

			/*
			* remove to the dynamic list
			* */
			const practitionerList = state.practitionerList.filter((item) => {
				return item.resource.id !== card.resource.id;
			});

			/*
			* also remove from the main source
			* */
			const practitionerSource = state.practitionerSource.filter((item) => {
				return item.resource.id !== card.resource.id;
			});




			setState(prevState => ({...prevState, practitionerList, practitionerSource}));
		}, [state]);


		return (
			<div className="practitioner-wrap">
				<div className="container">
					<div className={'search-wrap'}>
						<Input
							iconPosition='left'
							placeholder='Search by name'>
							<Icon name='user'/>
							<input
								ref={searchByName}
								onChange={handleFilterChange}/>
						</Input>
					</div>

					<div className={'list-wrap'}>
						<PractitionerCardModalComponent ref={CardModal} handleDelete={handleDelete} />

						{
							state.practitionerList.map((item, i) => {
								return (
									<PractitionerCardComponent
										onDelete={handleOpenModal(item)}
										card={item}
										key={item.resource.id}/>
								);
							})
						}
					</div>


					{
						state.loading && (
							<Dimmer active>
								<Loader/>
							</Dimmer>
						)
					}
				</div>


			</div>
		);
	}),
);


