import RenderTodo from "./RenderTodo";
import React from "react";

const RenderAllTodos = props => {
  return (
    <div>
      {props.toDos.map(
        (item, index) =>
          !item.isCompleted === props.isCompleted ? null : (
            <RenderTodo
              key={item.key}
              todo={item.todo}
              isCompleted={props.isCompleted}
              index={index}
              deleteToDo={props.deleteToDo}
              changeStateOfTodo={props.changeStateOfTodo}
            />
          )
      )}
    </div>
  );
};

export default RenderAllTodos;
