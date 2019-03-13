import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import NavBar from './nav-bar';
import RightBar from './right-bar';
import { fetchProducts } from '../actions/products';
import { Link } from 'react-router-dom';

export class Admin extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProducts());
    }

    render() {
        return (
            <div className="page">
                <NavBar />
                <div className="main-container admin-main-page">
                    <h2>Admin Main Page</h2>
                    <ul>
                        <li><Link className="text" to='/admin-manage-products'>Manage Products</Link></li>
                        <li><Link className="text" to='/admin-approve-user-reviews'>Approve User Reviews</Link></li>
                    </ul>
                </div>
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
        products: state.products.products,
    };
};

export default requiresLogin()(connect(mapStateToProps)(Admin));