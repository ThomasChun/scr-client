import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import NavBar from './nav-bar';
import RightBar from './right-bar';
import { fetchProducts } from '../actions/products';
import { Link } from 'react-router-dom';
import { fetchReviews, approveReview, deleteReview } from '../actions/reviews';

export class AdminApproveUserReviews extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProducts());
    this.props.dispatch(fetchReviews());
  }

  handleDeleteClick(e) {
    console.log('approved clicked');
    console.log(e.target.id);
    let reviewId = e.target.id;
    this.props.dispatch(deleteReview(reviewId));
  }

  render() {
    const { products, reviews } = this.props;
    console.log('reviews', reviews);
    if (!products) {
      return null;
    }

    let unapprovedReviews = reviews.filter(review => review.approved === false);
    console.log(unapprovedReviews);

    unapprovedReviews.forEach((review, index) => {
      review.youtubeUrl = review.youtubeUrl.replace('watch?v=', 'embed/');
      return review;
    })

    unapprovedReviews = unapprovedReviews.map((review, index) => {
      return (
        <div key={index} className='individual-user-review-container'>
          <div key={review.id}></div>
          <ul>
            <li><b>Approved:</b> {review.approved}</li>
            <li><b>Review ID:</b> {review.id}</li>
            <li><b>Product Name:</b> {review.productName}</li>
            <li><b>Review By:</b> {review.username}</li>
            <li><b>Posted At:</b> {review.createdAt}</li>
            <li><b>Overall Rating:</b> {review.overallRating}</li>
            <li><b>Value Rating:</b> {review.valueRating}</li>
            <li><b>Design Rating:</b> {review.designRating}</li>
            <li><b>Excitement Rating:</b> {review.excitementRating}</li>
            <li><b>Checklist Rating:</b> {review.checklistRating}</li>
            <li><b>Recommend Product:</b> {review.recommendProduct}</li>
            <li><b>Top Card Breakdown:</b> {review.hitList}</li>
            <li><b>Box Break Review:</b> {review.userReview}</li>
            <li><b>Box Break Images:</b> {review.userBreakImages}</li>
            <li><b>Liked:</b> {review.liked}</li>
            <li><b>YouTube URL:</b> {review.youtubeUrl}</li>
          </ul>
          { // check to see if user review includes a valid youtube embed url.
            (!review.youtubeUrl.includes('https://www.youtube.com/embed/'))
              ? <div>This review does not include a YouTube video.</div>
              : <iframe key={index} width="420" height="240" src={review.youtubeUrl}></iframe>
          }
          <button type='submit' id={review.id} onClick={(e) => this.handleDeleteClick(e)}>Delete</button>
        </div>
      )
    })

    return (
      <div className="page">
        <NavBar />
        <div className="main-container admin-page">
          <h2>Admin Approve User Reviews</h2>
          <li><Link className="text" to='/admin'>Return to Admin Page</Link></li>
          {unapprovedReviews}
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
    reviews: state.reviews.reviews,
  };
};

export default requiresLogin()(connect(mapStateToProps)(AdminApproveUserReviews));