import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react';
import {Button, Card, Modal} from "semantic-ui-react";
import { PractitionerModel } from "@interfaces/interfaces";


interface Props {
	handleDelete: (item: PractitionerModel) => void;
}

interface State {
	open: boolean;
	card?: PractitionerModel;

}

export interface Ref {
	show: (card: PractitionerModel) => void;
}

const initialState = (props: Props) => {
	return {
		open: false,
	};
};

export const PractitionerCardModalComponent = memo(
	forwardRef<Ref, Props>((props, ref) => {
		const [state, setState] = useState<State>(initialState(props));


		const show = useCallback((card) => {
			setState(prevState => ({...prevState, card, open: true}));
		}, [state]);

		const hide = useCallback((card?: PractitionerModel) => {
			return () => {

				if(card) {
					/*
					* this will process the delete
					* */
					props.handleDelete(card);
				}

				setState(prevState => ({...prevState, open: false}));
			};
		}, [state]);

		useImperativeHandle(ref, () => ({
			show,
		}));

		return (
			<Modal
				size={"mini"}
				open={state.open}>
				<Card.Header>Remove <b>{
					!!state.card?.resource.name[0].given
						? `${state.card.resource.name[0].given} ${state.card.resource.name[0].family}`
						: state.card?.resource.name[0].family
				}</b>?</Card.Header>
				<Modal.Content>
					<p>Are you sure you want to delete your account</p>
				</Modal.Content>
				<Modal.Actions>
					<Button
						onClick={hide()}
						negative>
						No
					</Button>
					<Button
						onClick={hide(state.card)}
						positive>
						Yes
					</Button>
				</Modal.Actions>
			</Modal>
		);
	}),
);


