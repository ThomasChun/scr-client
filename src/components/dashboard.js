import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import './dashboard.css';
import NavBar from './nav-bar';

export class Dashboard extends React.Component {
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <NavBar />
                <div className="dashboard">
                    <div className="dashboard-username">Username: {this.props.username}</div>
                    <div className="dashboard-name">Name: {this.props.name}</div>
                </div>
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
