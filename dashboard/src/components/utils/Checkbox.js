import React, { useState } from "react";
import PropTypes from "prop-types";
import _uniqueId from "lodash/uniqueId";

const Checkbox = ({ text, defaultValue, update }) => {
  const [isChecked, setChecked] = useState(defaultValue);
  const [id] = useState(_uniqueId("prefix-"));

  return (
    <div
      className="btn btn-block chk"
      onClick={() => {
        console.log("clicked!", !isChecked);
        if (update) update(!isChecked);
        setChecked(!isChecked);
      }}
    >
      <input
        type="checkbox"
        value={text}
        checked={isChecked}
        onChange={(e) => e.preventDefault()}
        onClick={(e) => e.preventDefault()}
        id={id}
      ></input>
      <label
        htmlFor={id}
        onChange={(e) => e.preventDefault()}
        onClick={(e) => e.preventDefault()}
      >
        {text}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  text: PropTypes.string.isRequired,
  defaultValue: PropTypes.bool.isRequired,
};
export default Checkbox;
