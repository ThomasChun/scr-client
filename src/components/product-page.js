import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import NavBar from './nav-bar';
import RightBar from './right-bar';
import { fetchProducts } from '../actions/products';
import ReviewForm from './review-form';
import { fetchReviews } from '../actions/reviews';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export class ProductPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
    this.props.dispatch(fetchReviews());
  }
  render() {

    const { product } = this.props.location.state;
    // console.log(product);
    const { reviews } = this.props;
    console.log(reviews);
    let userReviews = reviews.filter(review => review.productName === product.name);
    console.log(userReviews);

    let overallRatingTotal = 0;
    let valueRatingTotal = 0;
    let designRatingTotal = 0;
    let excitementRatingTotal = 0;
    let checklistRatingTotal = 0;
    let recommendProductCount = 0;
    let youtubeVideoArray = [];
    let userBreakImagesArray = [];
    let totalReviews = userReviews.length;
    let userBreakImages = [];
    let displayUserImages;
    let youtubeEmbededUrls = [];
    let displayYoutubeVideos;
    let filteredYoutubeVideoArray;
    let noYoutubeVideos;
    let noImagesToDisplay;
    let totalProductReviews = 0;

    if (userReviews.length >= 1) {
      totalProductReviews = userReviews.length;
      userReviews.forEach(review => {
        overallRatingTotal += parseInt(review.overallRating) / totalReviews;
        valueRatingTotal += parseInt(review.valueRating) / totalReviews;
        designRatingTotal += parseInt(review.designRating) / totalReviews;
        excitementRatingTotal += parseInt(review.excitementRating) / totalReviews;
        checklistRatingTotal += parseInt(review.checklistRating) / totalReviews;
        if (review.recommendProduct === 'Yes') {
          recommendProductCount++;
        }
        youtubeVideoArray.push(review.youtubeUrl);
        userBreakImagesArray.push(review.userBreakImages);
      });

      overallRatingTotal = Math.round(overallRatingTotal * 10) / 10;
      valueRatingTotal = Math.round(valueRatingTotal * 10) / 10;
      designRatingTotal = Math.round(designRatingTotal * 10) / 10;
      excitementRatingTotal = Math.round(excitementRatingTotal * 10) / 10;
      checklistRatingTotal = Math.round(checklistRatingTotal * 10) / 10;

      // user images photo's
      if (userBreakImagesArray.length > 0) {
        userBreakImagesArray.forEach(userImages => {
          userImages.forEach(image => {
            userBreakImages.push(image);
          })
        })
      }

      if (userBreakImages.length <= 0) {
        noImagesToDisplay = <span>No user images to display!</span>
      } else {
        noImagesToDisplay = '';
      }

      displayUserImages = userBreakImages.map((image, index) => {
        return (
          <div>
            <img className='userBreakImages' src={image} key={index} alt={`card ${index}`} />
          </div>
        )
      })

      // filter out videos that don't have proper youtube urls
      filteredYoutubeVideoArray = youtubeVideoArray.filter(videoUrl => videoUrl.includes('https://www.youtube.com/watch?v='))

      // handle youtube urls here... convert to embed urls.
      filteredYoutubeVideoArray.map((videoUrl) => {
        youtubeEmbededUrls.push(videoUrl.replace('watch?v=', 'embed/'));
      });

      console.log('after youtube embed', youtubeEmbededUrls);

      if (youtubeEmbededUrls.length > 0) {
        displayYoutubeVideos = youtubeEmbededUrls.map((image, index) => {
          return (
            <iframe key={index} width="420" height="345" src={image}></iframe>
          )
        })
      } else {
        noYoutubeVideos = <div>No YouTube videos to display!</div>
      }

      // display user reviews for product
      userReviews.map((review, index) => {

      })

      console.log('userBreakImages', userBreakImages);

      console.log('overall rating', overallRatingTotal);
      console.log('value rating', valueRatingTotal);
      console.log('design rating', designRatingTotal);
      console.log('excitement rating', excitementRatingTotal);
      console.log('checklist rating', checklistRatingTotal);
      console.log('recommend product count', recommendProductCount);
      console.log('youtube videos', youtubeVideoArray);
      console.log('user break images', userBreakImagesArray);
    } // end of condition ==> if (userReviews.length >= 1)

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
                <h3>{totalProductReviews} User Reviews:</h3>
                <div className="product-page-product-rating-data-list">
                  <li>Overall Rating: {overallRatingTotal}</li>
                  <li>Value: {valueRatingTotal}</li>
                  <li>Design: {designRatingTotal}</li>
                  <li>Excitement: {excitementRatingTotal}</li>
                  <li>Checklist: {checklistRatingTotal}</li>
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
              <h3>Buy {product.name} Boxes:</h3>
              <div>eBay Link to boxes with price --> $__.__ <button>Buy</button></div>
              <div>Amazon Link to boxes --> $__.__ <button>Buy</button></div>
              <div>Blowout Cards --> $__.__ <button>Buy</button></div>
              <div>Dave & Adams --> $__.__ <button>Buy</button></div>
              <div>Steel City Collectibles --> $__.__ <button>Buy</button></div>
            </section>
            <hr />
            <section className="product-page-ebay-singles-links">
              <h3>Buy {product.name} Singles on eBay:</h3>
              <div>Gallery of links to buy singles on ebay.</div>
            </section>
            <hr />
            <section className="product-page-pulls-images">
              <h3>Card Images: {noImagesToDisplay}</h3>
              <div>
                <Carousel dynamicHeight showThumbs={false} width='500px'>
                  {displayUserImages}
                </Carousel>
              </div>
            </section>
            <hr />
            <section className="product-page-user-video-collection">
              <h3>YouTube Break Videos: {noYoutubeVideos}</h3>
              <Carousel showThumbs={false} width='600px'>
                {displayYoutubeVideos}
              </Carousel>
            </section>
            <hr />
            <section className="product-page-user-review-form">
              <button onClick={() => console.log('click')}>Create Review!</button>
              <h3>Fill out the form below to post a review of your break!</h3>
              <ReviewForm currentUser={this.props.username} imageCount={this.props.imageCount} product={product} />
            </section>
            <hr />
            <section className="product-page-user-reviews-list">
              <h3>Box Break Reviews</h3>
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
    imageCount: state.auth.imageCount,
    reviews: state.reviews.reviews,
  };
};

export default requiresLogin()(connect(mapStateToProps)(ProductPage));