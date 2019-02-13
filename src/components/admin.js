import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import NavBar from './nav-bar';
import RightBar from './right-bar';
import ProductForm from './product-form';
import { fetchProducts } from '../actions/products';

export class Admin extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProducts());
    }

    render() {
        const { products } = this.props;

        if (!products) {
            return null;
        }

        let productsList;
        if (products.length === 0) {
            productsList = <p>There are no products!</p>
        } else {
            productsList = products.map((product, index) => {
                return (
                    <div className="admin-product-info-container" key={index}>
                        <li><b>Name:</b> {product.name}</li>
                        <li><b>sport:</b> {product.sport}</li>
                        <li><b>year:</b> {product.year}</li>
                        <li><b>release date:</b> {product.releaseDate}</li>
                        <li><b>brand:</b> {product.brand}</li>
                    </div>
                )
            })
        }

        return (
            <div className="page">
                <NavBar />
                <div className="main-container admin-page">
                    <h2>Admin Page</h2>
                    <h3>Add Product</h3>
                    <ProductForm />
                    {productsList}
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