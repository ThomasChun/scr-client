import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import NavBar from './nav-bar';
import RightBar from './right-bar';
import { fetchProducts } from '../actions/products';
import { Link } from 'react-router-dom';

export class AdminApproveUserReviews extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }

  render() {
    const { products } = this.props;

    if (!products) {
      return null;
    }

    return (
      <div className="page">
        <NavBar />
        <div className="main-container admin-page">
          <h2>Admin Approve User Reviews</h2>
          <li><Link className="text" to='/admin'>Return to Admin Page</Link></li>
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

export default requiresLogin()(connect(mapStateToProps)(AdminApproveUserReviews));