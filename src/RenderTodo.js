import React from "react";
import PropTypes from "prop-types";

class RenderTodo extends React.Component {
  editTodo = "";

  deleteToDo = () => {
    this.props.deleteToDo(this.props.index);
  };

  onKeyUp = event => {
    if (event.key === "Enter") event.preventDefault();
  };

  onKeyDown = event => {
    if (event.key === "Enter") event.preventDefault();
  };

  changeStateOfTodo = event => {
    event.target.classList.toggle("checked");
    this.props.changeStateOfTodo(this.props.index, event);
  };

  render() {
    return (
      <li
        id={this.props._id}
        className={this.props.isCompleted ? "checked" : ""}
        onClick={this.changeStateOfTodo}
      >
        <span
          className="toDo"
          ref={node => (this.editTodo = node)}
          onKeyUp={this.onKeyUp}
          onKeyDown={this.onKeyDown}
        >
          {this.props.todo}
        </span>
        <img
          className="deleteButton"
          onClick={this.deleteToDo}
          src="https://www.materialui.co/materialIcons/navigation/close_black_2048x2048.png"
        />
      </li>
    );
  }
}

RenderTodo.propTypes = {
  _id: PropTypes.string,
  toDo: PropTypes.string,
  isCompleted: PropTypes.boolean,
  index: PropTypes.number,
  changeStateOfTodo: PropTypes.func,
  updateTodo: PropTypes.func,
  deleteToDo: PropTypes.func
};

export default RenderTodo;
