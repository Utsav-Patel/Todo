import React from "react";
import PropTypes from "prop-types";

const RenderInput = props => {
  return (
    <input
      className="in"
      onKeyDown={props.instance.onSpecialKey}
      type="text"
      ref={node => (props.instance.inputString = node)}
      placeholder="Enter your title here..."
    />
  );
};

RenderInput.prototype = {
  instance: PropTypes.object
};

export default RenderInput;
