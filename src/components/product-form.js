import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { required, nonEmpty, isTrimmed } from '../validators';
import { createProduct } from '../actions/products';

export class ProductForm extends React.Component {

  onSubmit(values) {
    this.props.dispatch(createProduct(values));
  }

  render() {
    return (
      <form
        className="product-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        <div>
          <label htmlFor="name"><b>Name:</b></label>
          <Field
            component={Input}
            type="text"
            name="name"
            id="name"
            validate={[required, nonEmpty, isTrimmed]}
          />
        </div>
        <div className="product-sport">
          <label htmlFor="sport"><b>Sport:</b></label>
          <Field
            component="select"
            type="text"
            name="sport"
            id="sport"
            validate={[required, nonEmpty, isTrimmed]}
          >
            <option value="">-- select an option --</option> 
            <option value="Baseball">Baseball</option>
            <option value="Basketball">Basketball</option>
            <option value="Football">Football</option>
            <option value="Hockey">Hockey</option>
          </Field>
        </div>
        <div>
          <label htmlFor="year"><b>Year</b> (ex: 2019 or 2018/19):</label>
          <Field
            component={Input}
            type="text"
            name="year"
            id="year"
            validate={[required, nonEmpty, isTrimmed]}
          />
        </div>
        <div>
          <label htmlFor="releaseDate"><b>Release Date</b> (ex: January 30th, 2019):</label>
          <Field
            component={Input}
            type="text"
            name="releaseDate"
            id="releaseDate"
            validate={[required, nonEmpty, isTrimmed]}
          />
        </div>
        <div>
          <label htmlFor="brand"><b>Brand</b> (ex: Topps, Panini, etc.):</label>
          <Field
            component={Input}
            type="text"
            name="brand"
            id="brand"
            validate={[required, nonEmpty, isTrimmed]}
          />
        </div>
        <div>
          <label htmlFor="productImageUrl"><b>Product Image URL:</b></label>
          <Field
            component={Input}
            type="text"
            name="productImageUrl"
            id="productImageUrl"
            validate={[required, nonEmpty, isTrimmed]}
          />
        </div>
        <div className="product-breakdown">
          <label htmlFor="breakdown"><b>Product Breakdown (Short):</b></label>
          <br/>
          <Field
            component="textarea"
            type="textarea"
            name="breakdown"
            id="breakdown"
            validate={[required, nonEmpty, isTrimmed]}
            className="form-control"
          />
        </div>
        <div className="product-description">
          <label htmlFor="description"><b>Description (Long):</b></label>
          <br/>
          <Field
            component="textarea"
            type="textarea"
            name="description"
            id="description"
            validate={[required, nonEmpty, isTrimmed]}
            className="form-control"
          />
        </div>
        <button className="product-submit-button"
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          Submit
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'product',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('product', Object.keys(errors)[0]))
})(ProductForm);