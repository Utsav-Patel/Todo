import React from "react";
import "./index.css";
import PropTypes from "prop-types";

const MyButtons = props => {
  return (
    <div className="myButtons">
      <button className="button" onClick={props.addToDo}>
        Add
      </button>
      <button className="button" onClick={props.clearInputString}>
        Clear Input
      </button>
    </div>
  );
};

MyButtons.propTypes = {
  addToDo: PropTypes.func,
  clearInputString: PropTypes.func
};

export default MyButtons;
