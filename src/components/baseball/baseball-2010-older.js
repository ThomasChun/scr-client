import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import NavBar from '../nav-bar';
import RightBar from '../right-bar';

export class Baseball2010Older extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="page">
                <NavBar />
                <div className="main-container">Baseball 2010 & Older...</div>
                <RightBar />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
    };
};

export default requiresLogin()(connect(mapStateToProps)(Baseball2010Older));