/**
 * Movie Book - Application
 *
 * @category   Application_Frontend
 * @package    movie-book
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from "react";

const Select = props => {
  const {
    name,
    label,
    options,
    error,
    defaultOptionId,
    defaultOptionName,
    ...rest
  } = props;

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} id={name} name={name} className="form-control">
        {options.map(option => (
          <option key={option[defaultOptionId]} value={option[defaultOptionId]}>
            {option[defaultOptionName]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Select.defaultProps = {
  defaultOptionId: "_id",
  defaultOptionName: "name"
};

export default Select;
