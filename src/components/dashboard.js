import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import './dashboard.css';
import NavBar from './nav-bar';
import RightBar from './right-bar';

export class Dashboard extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="page">
                <NavBar />
                <div className="main-container">Dashboard main content text here...</div>
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

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
