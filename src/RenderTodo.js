import React from "react";
import "./index.css";
import PropTypes from "prop-types";
import { Transform } from "stream";

const RenderTodo = props => {
  return (
    <li onClick={props.changeStateOfTodo}>
      <span className="toDo" contentEditable="true">
        {props.item.todo}
      </span>
      <img
        className="deleteButton"
        onClick={props.deleteToDo}
        src="https://www.materialui.co/materialIcons/navigation/close_black_2048x2048.png"
      />
    </li>
  );
};

RenderTodo.propTypes = {
  changeStateOfTodo: PropTypes.func,
  deleteToDo: PropTypes.func,
  item: PropTypes.object
};

export default RenderTodo;
