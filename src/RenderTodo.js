import React from "react";
import PropTypes from "prop-types";

class RenderTodo extends React.Component {
  editTodo = "";

  deleteToDo = () => {
    this.props.deleteToDo(this.props.index);
  };

  onKeyUp = event => {
    if (event.key === "Enter") event.preventDefault();
    this.props.updateTodo(this.editTodo.textContent, this.props.index);
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
        id={this.props.key}
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
  changeStateOfTodo: PropTypes.func,
  deleteToDo: PropTypes.func,
  item: PropTypes.object
};

export default RenderTodo;
