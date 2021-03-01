import React, { Component } from "react";


interface Props {
}

interface State {
	hasError: boolean;
}

const initialState = (props: Props) => {
	return {
		hasError: false,
	};
};

export class ErrorBoundary extends Component<Props, State> {
	readonly state: State = initialState(this.props);

	static getDerivedStateFromError() {
		// Update state so the next render will show the fallback UI.
		return {hasError: true};
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>;
		}

		return this.props.children;
	}
}
