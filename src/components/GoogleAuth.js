import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component
{
	auth = null;
	state = { isSignedIn: null };

	componentDidMount()
	{
		window.gapi.load('client:auth2', () => {
			window.gapi.client.init({
				clientId: '383123119010-quudhk3vp0se7ump13tqcoibblc7uiou.apps.googleusercontent.com',
				scope: 'email'
			}).then(() => {
				this.auth = window.gapi.auth2.getAuthInstance();
				this.setState({ isSignedIn: this.auth.isSignedIn.get() });
				this.auth.isSignedIn.listen(this.onAuthChange)
			});
		});
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn();
		} else {
			this.props.signOut();
		}
	};

	onClickSignIn = () => {
		this.auth.signIn();
	};

	onClickSignOut = () => {
		this.auth.signOut();
	};

	renderAuthButton()
	{
		if (this.state.isSignedIn === null) {
			return (
				<button className="ui google button">
					<i className="google icon"></i> Loading...
				</button>
			);
		} else if (this.state.isSignedIn) {
			return (
				<button className="ui red google button" onClick={this.onClickSignOut}>
					<i className="google icon"></i> Sign-Out
				</button>
			);
		} else {
			return (
				<button className="ui blue google button" onClick={this.onClickSignIn}>
					<i className="google icon"></i> Sign-In
				</button>
			);
		}
	}

	render()
	{
		return (
			<div className="item">{this.renderAuthButton()}</div>
		);
	}
}

export default connect(null, { signIn, signOut })(GoogleAuth);
