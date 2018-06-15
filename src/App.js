import React from "react";
import "./index.css";
import Notification from "./Notifications";
import RenderTodo from "./RenderTodo";
import RenderInput from "./RenderInput";
import _uniqueId from "lodash/uniqueId";

const notification = {
  itemIsAdded: "Added Todo: ",
  itemIsDeleted: "Deleted Todo: "
};

const emptyStringErrorMessage = "Enter non-empty String";

class App extends React.Component {
  lastExecutedString = "";
  timer = -1;

  constructor(props) {
    super(props);
    this.state = {
      toDos: JSON.parse(localStorage.getItem("toDos")) || [],
      isErrorShow: false
    };
  }

  removeNotification = () => {
    this.lastExecutedString = "";
    this.setState({
      isErrorShow: false
    });
  };

  addToDo = inputString => {
    if (!(inputString === "")) {
      this.setState({
        toDos: [
          { todo: inputString, key: _uniqueId(), isCompleted: false },
          ...this.state.toDos
        ],
        isErrorShow: false
      });
      this.lastExecutedString = notification.itemIsAdded + " " + inputString;
      localStorage.setItem("toDOs", JSON.stringify(this.state.toDos));
    } else {
      this.setState({
        isErrorShow: true
      });
    }
    clearTimeout(this.timer);
    this.timer = setTimeout(this.removeNotification, 2000);
  };

  deleteToDo = (index, event) => {
    this.lastExecutedString =
      notification.itemIsDeleted + " " + this.state.toDos[index].todo;
    let temporaryTodos = this.state.toDos;
    temporaryTodos.splice(index, 1);
    this.setState({
      toDos: temporaryTodos
    });
    localStorage.setItem("toDos", JSON.stringify(this.state.toDos));
    clearTimeout(this.timer);
    this.timer = setTimeout(this.removeNotification, 2000);
  };

  onSpecialKey = (inputObject, event) => {
    if (event.key === "Enter") {
      this.addToDo(inputObject.value);
      inputObject.value = "";
    }
  };

  changeStateOfTodo = (index, event) => {
    if (event.target.classList.contains("deleteButton")) return;
    let temporaryTodos = this.state.toDos;
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    this.setState({
      toDos: temporaryTodos
    });
    localStorage.setItem("toDos", JSON.stringify(this.state.toDos));
  };

  updateTodo = (editTodo, index) => {
    if (editTodo === "") this.deleteToDo(index);
  };

  render() {
    return (
      <div className="app">
        <div className="heading">todos</div>
        <RenderInput onSpecialKey={this.onSpecialKey} />
        <ul>
          <div className="completed">
            <div className="heading2">Remaining</div>
            {this.state.toDos.map(
              (item, index) =>
                item.isCompleted ? (
                  ""
                ) : (
                  <RenderTodo
                    key={item.key}
                    todo={item.todo}
                    isCompleted={item.isCompleted}
                    index={index}
                    updateTodo={this.updateTodo}
                    deleteToDo={this.deleteToDo}
                    changeStateOfTodo={this.changeStateOfTodo}
                  />
                )
            )}
          </div>
          <div className="completed">
            <div className="heading2">Completed</div>
            {this.state.toDos.map(
              (item, index) =>
                !item.isCompleted ? (
                  ""
                ) : (
                  <RenderTodo
                    key={item.key}
                    todo={item.todo}
                    isCompleted={item.isCompleted}
                    index={index}
                    updateTodo={this.updateTodo}
                    deleteToDo={this.deleteToDo}
                    changeStateOfTodo={this.changeStateOfTodo}
                  />
                )
            )}
          </div>
        </ul>
        <Notification
          key={_uniqueId()}
          isErrorMessage={this.state.isErrorShow}
          lastExecutedString={this.lastExecutedString}
          errorString={emptyStringErrorMessage}
        />
      </div>
    );
  }
}

export default App;
