import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import NavBar from '../nav-bar';
import RightBar from '../right-bar';
import { fetchProducts } from '../../actions/products';
import { Link } from 'react-router-dom';

export class Baseball2019 extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchProducts());
    }
    render() {

        const { products } = this.props;

        if (!products) {
            return null;
        }

        let baseball2019;

        if (products !== null) {
            baseball2019 = products.filter(product => product.sport === 'Baseball' && product.year === '2019');
            baseball2019 = baseball2019.map((product, index) => {
                return (
                    <div className="product-by-year-info-container" key={index} id={product.id}>
                        <div className="product-by-year-image-container">
                        <Link to={{ pathname: `/baseball-2019/${product.name}`, state: { product: product } }}><img src={product.productImageUrl} alt={product.name} /></Link>
                        </div>
                        <ul>
                            <Link className="product-by-year-name" to={{ pathname: `/baseball-2019/${product.name}`, state: { product: product } }}><li><b>{product.name}</b></li></Link>
                            <li className="product-by-year-release-date"><b>Release Date:</b> {product.releaseDate}</li>
                        </ul>
                    </div>
                )
            })
        }

        return (
            <div className="page">
                <NavBar />
                <div className="main-container">
                    <h2 className="product-by-year-main-title">2019 Baseball Box Break Reviews</h2>
                    {baseball2019}
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

export default requiresLogin()(connect(mapStateToProps)(Baseball2019));