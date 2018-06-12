import React from "react";
import PropTypes from "prop-types";

const RenderInput = props => {
  return (
    <input
      className="in"
      onKeyDown={props.onSpecialKey}
      type="text"
      ref={node => (props.myNeededString.inputString = node)}
      placeholder="Enter your title here..."
    />
  );
};

RenderInput.propTypes = {
  instance: PropTypes.object
};

export default RenderInput;
