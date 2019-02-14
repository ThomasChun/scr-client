import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import NavBar from './nav-bar';
import RightBar from './right-bar';
import { fetchProducts } from '../actions/products';
import { Link } from 'react-router-dom';

export class ProductPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
  }
  render() {

    // const { products } = this.props;

    // if (!products) {
    //     return null;
    // }

    // let baseball2019;

    // if (products !== null) {
    //     baseball2019 = products.filter(product => product.sport === 'Baseball' && product.year === '2019');
    //     baseball2019 = baseball2019.map((product, index) => {
    //         return (
    //             <div className="product-by-year-info-container" key={index} id={product.id}>
    //                 <img src={product.productImageUrl} alt="2019 Topps Baseball" />
    //                 <ul>
    //                     <Link className="product-by-year-name" to={{ pathname: `/baseball-2019/${product.name}`, state: {product: product}}}><li><b>{product.name}</b></li></Link>
    //                     <li className="product-by-year-release-date"><b>Release Date:</b> {product.releaseDate}</li>
    //                 </ul>
    //             </div>
    //         )
    //     })
    // }

    const { product } = this.props.location.state;
    console.log(product);

    return (
      <div className="page">
        <NavBar />
        <div className="main-container">
          <div className="product-page-main">
            <h2 className="product-page-product-name">{product.name}</h2>
            <section className="product-page-image-breakdown-container">
              <div className="product-page-image-container">
                <img src={product.productImageUrl} alt={product.name} />
              </div>
              <div className="product-page-product-rating-data">
                <h3>User Reviews:</h3>
                <div className="product-page-product-rating-data-list">
                  <li>Overall Rating: *****</li>
                  <li>Value: *****</li>
                  <li>Design: *****</li>
                  <li>Category 4: *****</li>
                  <li>Category 5: *****</li>
                </div>
                <button>Full Breakdown</button>
                <button>Sell Sheet</button>
                <button>Checklist</button>
              </div>
            </section>
            <hr />
            <section className="product-page-product-breakdown">
              <h3>Product Breakdown:</h3>
              <div className="product-page-product-breakdown-text">{product.breakdown}</div>
            </section>
            <hr />
            <section className="product-page-buying-options">
              <div>eBay Link to boxes with price --> $__.__ <button>Buy</button></div>
              <div>Amazon Link to boxes --> $__.__ <button>Buy</button></div>
              <div>Blowout Cards --> $__.__ <button>Buy</button></div>
              <div>Dave & Adams --> $__.__ <button>Buy</button></div>
              <div>Steel City Collectibles --> $__.__ <button>Buy</button></div>
            </section>
            <hr />
            <section className="product-page-ebay-singles-links">
              <div>Gallery of links to buy singles on ebay.</div>
            </section>
            <hr />
            <section className="product-page-pulls-images">
              <div>Gallery of big pulls / hits posted by reviewers will show up here.</div>
            </section>
            <hr />
            <section className="product-page-user-video-collection">
              <div>Gallery of videos posted by reviewers will show up here.</div>
            </section>
            <hr />
            <section className="product-page-user-reviews">
              <div>User reviews posted by reviewers will show up here.</div>
            </section>
          </div>
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

export default requiresLogin()(connect(mapStateToProps)(ProductPage));