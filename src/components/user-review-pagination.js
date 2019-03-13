import React from 'react';
import Pagination from './pagination';

class UserReviewPagination extends React.Component {
  constructor(props) {
    super(props);

    // bind the onChangePage method to this React component
    this.onChangePage = this.onChangePage.bind(this);

    // store example items and current page of items in local state
    this.state = {
      exampleItems: this.props.items,
      pageOfItems: []
    };
  }

  onChangePage(pageOfItems) {
    // update local state with new page of items
    this.setState({ pageOfItems });
  }

  render() {
    return (
      <div>
        {this.state.pageOfItems.map((review, index) =>
        <div key={index} className='individual-user-review-container'>
          <div key={review.id}>{review.id}</div>
          <ul>
            <li><b>Review By:</b> {review.username}</li>
            <li><b>Overall Rating:</b> {review.overallRating}</li>
            <li><b>Value Rating:</b> {review.valueRating}</li>
            <li><b>Design Rating:</b> {review.designRating}</li>
            <li><b>Excitement Rating:</b> {review.excitementRating}</li>
            <li><b>Checklist Rating:</b> {review.checklistRating}</li>
            <li><b>Recommend Product:</b> {review.recommendProduct}</li>
            <li><b>Top Card Breakdown:</b> {review.hitList}</li>
            <li><b>Box Break Review:</b> {review.userReview}</li>
          </ul>
          { // check to see if user review includes a valid youtube embed url.
            (!review.youtubeUrl.includes('https://www.youtube.com/embed/'))
              ? <div>This review does not include a YouTube video.</div>
              : <iframe key={index} width="420" height="240" src={review.youtubeUrl}></iframe>
          }
        </div>
        )}
        <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
      </div>
    );
  }
}

export default UserReviewPagination;