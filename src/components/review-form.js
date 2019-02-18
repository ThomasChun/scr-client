import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { required, nonEmpty, isTrimmed } from '../validators';
import { userImageCountIncrement, userImageCountDecrement } from '../actions/auth';
import { createReview } from '../actions/reviews';

// import StarRatingComponent from 'react-star-rating-component';

export class ReviewForm extends React.Component {

  onSubmit(values) {
    console.log(values);
    console.log('current user ->', this.props.currentUser);
    console.log('product ->', this.props.product.name);
    console.log('product ->', this.props.product.year);
    this.props.dispatch(createReview(this.props.product.name, values));
    alert('Your review has successfully been posted!');
  }

  handleAddImageClick(fields) {
    fields.push();
    let imageCount = fields.length + 1;
    console.log('increment', imageCount);
    this.props.dispatch(userImageCountIncrement(imageCount));
  }

  handleRemoveImageClick(fields, index) {
    fields.remove(index);
    let imageCount = fields.length - 1;
    console.log('decrement', imageCount);
    this.props.dispatch(userImageCountDecrement(imageCount));
  }

  render() {
    
    const renderField = ({ input, label, type, meta: { touched, error } }) => (
      <div>
        <label>{label}</label>
          <input {...input} type={type} placeholder='card image url'/>
          {touched && error && <span>{error}</span>}
      </div>
    )
    
    const { imageCount } = this.props;
    console.log('state imageCount', imageCount);
    let disableAddButton;
    let addImageButtonText;
    if (imageCount >= 6) {
      disableAddButton = true;
      addImageButtonText = 'Maxium Images Reached';
    } else {
      disableAddButton = false;
      addImageButtonText = 'Add Card Image';
    }

    const userImages = ({ fields, meta: { error } }) => (
      <div>
        <div>
          <button type="button" disabled={disableAddButton} onClick={() => this.handleAddImageClick(fields)}>{addImageButtonText}</button>
        </div>
        {fields.map((card, index) =>
          <div className="review-form-user-break-images-input-container" key={index}>
            <Field
              name={card}
              type="text"
              component={renderField}
              label={`Card Image URL #${index + 1}:`}/>
            <button
              className="review-form-remove-image-button"
              type="button"
              title="Remove Card Image"
              onClick={() => this.handleRemoveImageClick(fields, index)}>remove</button>
          </div>
        )}
      </div>
    )

    return (
      <form
        className="review-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        <div className="review-form-overall-rating">
          <label htmlFor="overallRating"><b>Overall Rating:</b></label>
          <Field
            component="select"
            type="number"
            name="overallRating"
            id="overallRating"
            validate={[required, nonEmpty, isTrimmed]}
          >
            <option value="">- select -</option> 
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Stars</option>
          </Field>
        </div>
        <div className="review-form-value-rating">
          <label htmlFor="valueRating"><b>Value Rating:</b></label>
          <Field
            component="select"
            type="text"
            name="valueRating"
            id="valueRating"
            validate={[required, nonEmpty, isTrimmed]}
          >
            <option value="">- select -</option> 
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Stars</option>
          </Field>
        </div>
        <div className="review-form-design-rating">
          <label htmlFor="designRating"><b>Design Rating:</b></label>
          <Field
            component="select"
            type="text"
            name="designRating"
            id="designRating"
            validate={[required, nonEmpty, isTrimmed]}
          >
            <option value="">- select -</option> 
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Stars</option>
          </Field>
        </div>
        <div className="review-form-excitement-rating">
          <label htmlFor="excitementRating"><b>Excitement Rating:</b></label>
          <Field
            component="select"
            type="text"
            name="excitementRating"
            id="excitementRating"
            validate={[required, nonEmpty, isTrimmed]}
          >
            <option value="">- select -</option> 
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Stars</option>
          </Field>
        </div>
        <div className="review-form-checklist-rating">
          <label htmlFor="checklistRating"><b>Checklist Rating:</b></label>
          <Field
            component="select"
            type="text"
            name="checklistRating"
            id="checklistRating"
            validate={[required, nonEmpty, isTrimmed]}
          >
            <option value="">- select -</option> 
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Stars</option>
          </Field>
        </div>
        <div className="review-form-recommend-feedback">
          <label htmlFor="recommendProduct"><b>Do you recommend buying this product?</b></label>
          <Field
            component="select"
            type="text"
            name="recommendProduct"
            id="recommendProduct"
            validate={[required, nonEmpty, isTrimmed]}
          >
            <option value="">- select -</option> 
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Field>
        </div>
        <div className="review-form-youtube-url">
          <label htmlFor="youtubeUrl"><b>YouTube Video URL:</b></label>
          <Field
            component="input"
            type="text"
            name="youtubeUrl"
            id="youtubeUrl"
            placeholder="www.youtube.com"
            validate={[required, nonEmpty, isTrimmed]}
            className="form-control"
          />
        </div>
        <div className="review-form-user-break-images">
          <label htmlFor="userBreakImages"><b>Upload card scans from your break:</b></label>
          <FieldArray name="userBreakImages" component={userImages} />
        </div>
        <div className="review-form-hit-list">
          <label htmlFor="hitList"><b>List Your Top Pulls Here:</b></label>
          <br/>
          <Field
            component="textarea"
            type="text"
            name="hitList"
            id="hitList"
            placeholder="example: Mike Trout - 2011 Topps Update Series RC #US175"
            validate={[required, nonEmpty, isTrimmed]}
            className="form-control"
          />
        </div>
        <div className="review-form-user-review">
          <label htmlFor="userReview"><b>Enter Review Here:</b></label>
          <br/>
          <Field
            component="textarea"
            type="text"
            name="userReview"
            id="userReview"
            placeholder="Enter your review here..."
            validate={[required, nonEmpty, isTrimmed]}
            className="form-control"
          />
        </div>
        <button className="review-submit-button"
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          Submit Review!
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'review',
})(ReviewForm);