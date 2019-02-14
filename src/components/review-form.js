import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { required, nonEmpty, isTrimmed } from '../validators';
import { userImageCountIncrement, userImageCountDecrement } from '../actions/auth';

// import StarRatingComponent from 'react-star-rating-component';

export class ReviewForm extends React.Component {

  onSubmit(values) {
    console.log(values);
    console.log('current user ->', this.props.currentUser);
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
          <label htmlFor="overall-rating"><b>Overall Rating:</b></label>
          <Field
            component="select"
            type="text"
            name="overall-rating"
            id="overall-rating"
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
          <label htmlFor="value-rating"><b>Value Rating:</b></label>
          <Field
            component="select"
            type="text"
            name="value-rating"
            id="value-rating"
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
          <label htmlFor="value-rating"><b>Design Rating:</b></label>
          <Field
            component="select"
            type="text"
            name="design-rating"
            id="design-rating"
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
          <label htmlFor="excitement-rating"><b>Excitement Rating:</b></label>
          <Field
            component="select"
            type="text"
            name="excitement-rating"
            id="excitement-rating"
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
          <label htmlFor="excitement-rating"><b>Checklist Rating:</b></label>
          <Field
            component="select"
            type="text"
            name="checklist-rating"
            id="checklist-rating"
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
          <label htmlFor="recommend-feedback"><b>Do you recommend buying this product?</b></label>
          <Field
            component="select"
            type="text"
            name="recommend-feedback"
            id="recommend-feedback"
            validate={[required, nonEmpty, isTrimmed]}
          >
            <option value="">- select -</option> 
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </Field>
        </div>
        <div className="review-form-youtube-url">
          <label htmlFor="youtube-url"><b>YouTube Video URL:</b></label>
          <Field
            component="input"
            type="text"
            name="youtube-url"
            id="youtube-url"
            placeholder="www.youtube.com"
            validate={[required, nonEmpty, isTrimmed]}
            className="form-control"
          />
        </div>
        <div className="review-form-user-break-images">
          <label htmlFor="user-break-images"><b>Upload card scans from your break:</b></label>
          <FieldArray name="user-break-images" component={userImages} />
        </div>
        <div className="review-form-hit-list">
          <label htmlFor="hit-list"><b>List Your Top Pulls Here:</b></label>
          <br/>
          <Field
            component="textarea"
            type="text"
            name="hit-list"
            id="hit-list"
            placeholder="example: Mike Trout - 2011 Topps Update Series RC #US175"
            validate={[required, nonEmpty, isTrimmed]}
            className="form-control"
          />
        </div>
        <div className="review-form-user-review">
          <label htmlFor="user-review"><b>Enter Review Here:</b></label>
          <br/>
          <Field
            component="textarea"
            type="text"
            name="user-review"
            id="user-review"
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