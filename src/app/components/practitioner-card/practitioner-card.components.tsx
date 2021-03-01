import React, {forwardRef, memo, useCallback, useState} from 'react';
import './practitioner-card.component.scss';
import { Button, Card, Image } from "semantic-ui-react";
import { PractitionerModel } from "@interfaces/interfaces";


interface Props {
	card: PractitionerModel;
	onDelete: (item:PractitionerModel) => void;
}

interface State {
	loading: boolean;
	card: PractitionerModel;
}

export interface Ref {
}

const initialState = (props: Props) => {
	return {
		loading: false,
		card: props.card,
	};
};

export const PractitionerCardComponent = memo(
	forwardRef<Ref, Props>((props, ref) => {
		const [state, setState] = useState<State>(initialState(props));

		const handleClick = useCallback(() => {
			props.onDelete(state.card);
		},[]);

		const {address} = state.card.resource;
		return (
			<Card>
				<Card.Content>
					<Image
						floated='right'
						size='medium'
						src={state.card.resource.photo}
					/>
					<Card.Header>{
						!!state.card.resource.name[0].given
							? `${state.card.resource.name[0].given} ${state.card.resource.name[0].family}`
							: state.card.resource.name[0].family
					}</Card.Header>
					<Card.Meta>{state.card.resource.resourceType}</Card.Meta>
					<Card.Description>
						{
							!!address
								? [address[0].line[0], address[0].city, address[0].state, address[0]?.country, address[0].postalCode].filter(Boolean).join(', ')
								: 'N/A'
						}
					</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<div className='ui two buttons'>
						<Button color='red' onClick={handleClick}>
							remove
						</Button>
					</div>
				</Card.Content>
			</Card>

		);
	}),
);


