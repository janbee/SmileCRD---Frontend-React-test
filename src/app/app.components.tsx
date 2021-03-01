import React, { forwardRef, memo, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import { PractitionerComponent } from "@components/practitioner/practitioner.components";
import {ErrorBoundary} from "@utilities/error-boundary";

interface Props {
}

interface State {
	loading: boolean;
}

export interface Ref {
}

const initialState = (props: Props) => {
	return {
		loading: true,
	};
};

export const AppComponent = memo(
	forwardRef<Ref, Props>((props, ref) => {
		const [state, setState] = useState<State>(initialState(props));

		return (
			<ErrorBoundary>
				<Switch>
					<Route
						path={'*'}
						strict={true}
						exact={true}
						component={PractitionerComponent}/>
				</Switch>
			</ErrorBoundary>

		);
	}),
);


