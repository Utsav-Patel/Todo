import React from "react";
import PropTypes from "prop-types";

class RenderInput extends React.Component {
  inputString = "";

  onKeyUp = event => {
    this.props.onSpecialKey(this.inputString, event);
  };

  onFocus = () => {
    this.inputString.placeholder = "";
  };

  onBlur = () => {
    this.inputString.placeholder = "Add Task..";
  };

  render() {
    return (
      <div>
        <input
          className="in"
          onKeyUp={this.onKeyUp}
          type="text"
          ref={node => (this.inputString = node)}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </div>
    );
  }
}

RenderInput.propTypes = {
  instance: PropTypes.object,
  addToDo: PropTypes.func,
  clearInputString: PropTypes.func
};

export default RenderInput;
