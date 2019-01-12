import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
import {Link} from 'react-router-dom';
import './forms.css';

const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');


export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <div>
                <h2 className="sign-register-title">Create Account</h2>
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="firstName"></label>
                <Field 
                    component={Input} 
                    type="text" 
                    name="firstName" 
                    label="First Name"
                    validate={[required, nonEmpty, isTrimmed]}
                    />
                <label htmlFor="lastName"></label>
                <Field 
                    component={Input} 
                    type="text" 
                    name="lastName" 
                    label="Last Name"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <label htmlFor="username"></label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    label="Username"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <label htmlFor="password"></label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    label="Password"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <label htmlFor="passwordConfirm"></label>
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    label="Confirm Password"
                    validate={[required, nonEmpty, matchesPassword]}
                />
                <button
                    className="register-button"
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>
                <Link className="login-link" to="/">Login</Link>
            </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
