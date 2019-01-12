import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import './forms.css';
import {Link} from 'react-router-dom';

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
            <div>
                
                <h2 className="sign-register-title">Sign In</h2>
                
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                {error}
                <label className="login-form-username" htmlFor="username"></label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    id="username"
                    label="Username"
                    validate={[required, nonEmpty]}
                />
                <label htmlFor="password"></label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    id="password"
                    label="Password"
                    validate={[required, nonEmpty]}
                />
                <button className="login-button" disabled={this.props.pristine || this.props.submitting}>
                    Log in
                </button>
                <Link className="register-link" to="/register">Register</Link>
            </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
