/**
 * Movie Book - Application - form Component
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { Component } from "react";
import Joi from "@hapi/joi";
import Input from "./../input";
import Select from "./../select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  // single input validation (on change)
  validateProparty = ({ name, value }) => {
    // using Joi validation
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    // using Joi validation
    return error ? error.details[0].message : null;
  };

  // this event fires on form validation to validate
  // form input values as per validation criteria
  validate = () => {
    // calling validate funciton from Joi library
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    // if no error return null
    if (!error) return null;

    // otherwise initialize errors object
    const errors = {};

    // iterate using map method
    // and collect all error messages
    error.details.map((err) => {
      errors[err.path[0]] = err.message;
      return errors;
    });

    return errors;
  };

  // event object destructuring
  // this event fires when form input value get changed
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProparty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  // this evert fires on form submission
  // to submit the form value
  handleSubmission = (event) => {
    // prevent page loading during form submission
    event.preventDefault();

    // getting all the form validatin errors
    const errors = this.validate();

    // setting form validation errors in the state
    this.setState({ errors });

    // calling hook funciton
    this.doSubmit();
  };

  // implementing input element
  renderInput(name, label, type = "text", autoFocus = false) {
    const { data, errors } = this.state;

    return (
      <Input
        autoFocus={autoFocus}
        type={type}
        name={name}
        label={label}
        error={errors ? errors[name] : ""}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  }

  // implementing select element
  renderSelect(name, label, options, autoFocus = false) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        label={label}
        options={options}
        value={data[name]}
        error={errors ? errors[name] : ""}
        autoFocus={autoFocus}
        onChange={this.handleChange}
      />
    );
  }

  // implementing button
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
}

export default Form;
