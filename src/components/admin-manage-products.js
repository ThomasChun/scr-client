import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import NavBar from './nav-bar';
import RightBar from './right-bar';
import ProductForm from './product-form';
import { fetchProducts, deleteProduct } from '../actions/products';
import { Link } from 'react-router-dom';

export class AdminManageProducts extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProducts());
    }

    handleEditClick(e) {
        console.log('Edit Button Clicked ' + e.target.id);
    }

    handleDeleteClick(e) {
        console.log('Delete Button Clicked ' + e.target.id);
        if(window.confirm(`Are you sure you want to delete '${e.target.name}'?`)) {
            this.props.dispatch(deleteProduct(e.target.id));
        }
        
    }

    handleSearchClick() {
        console.log('Search Button Clicked');
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
                            <div>
                                <button type='submit' id={product.id} name={product.name} onClick={(e) => this.handleEditClick(e)}>EDIT</button>
                                <button type='submit' id={product.id} name={product.name} onClick={(e) => this.handleDeleteClick(e)}>DELETE</button>
                            </div>
                        </div>
                )
            })
        }

        return (
            <div className="page">
                <NavBar />
                <div className="main-container admin-manage-products">
                    <h2>Manage Products</h2>
                    <li><Link className="text" to='/admin'>Return to Admin Page</Link></li>
                    <h3>Add Product</h3>
                    <ProductForm />
                    <h3>Edit / Remove Products</h3>
                    <input type='text' placeholder='Search for product...'></input>
                    <button type='submit' onClick={() => this.handleSearchClick()}>search</button>
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

export default requiresLogin()(connect(mapStateToProps)(AdminManageProducts));