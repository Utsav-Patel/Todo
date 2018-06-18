import React from "react";
import "./index.css";
import Notification from "./Notifications";
import RenderInput from "./RenderInput";
import _uniqueId from "lodash/uniqueId";
import RenderAllTodos from "./RenderAllTodos";

const NOTIFICATION = {
  itemIsAdded: "Added Todo: ",
  itemIsDeleted: "Deleted Todo: "
};

const EMPTY_STRING_ERROR_MESSAGE = "Enter non-empty String";

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

  isEmptyString = string => {
    if (string === "") return true;
    return false;
  };

  setTimer = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(this.removeNotification, 2000);
  };

  setStateUpdateLocalStorage(toDos, isErrorShow) {
    this.setState({
      toDos: toDos,
      isErrorShow: isErrorShow
    });
    localStorage.setItem("toDos", JSON.stringify(this.state.toDos));
  }

  addToDo = inputString => {
    if (!this.isEmptyString(inputString)) {
      let temporaryTodos = this.state.toDos;
      temporaryTodos.unshift({
        todo: inputString,
        key: _uniqueId(),
        isCompleted: false
      });
      this.setStateUpdateLocalStorage(temporaryTodos, false);
      this.lastExecutedString = NOTIFICATION.itemIsAdded + " " + inputString;
    } else {
      this.setStateUpdateLocalStorage(this.state.toDos, true);
    }
    this.setTimer();
  };

  deleteToDo = (index, event) => {
    this.lastExecutedString =
      NOTIFICATION.itemIsDeleted + " " + this.state.toDos[index].todo;
    let temporaryTodos = this.state.toDos;
    temporaryTodos.splice(index, 1);
    this.setStateUpdateLocalStorage(temporaryTodos, false);
    this.setTimer();
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
    this.setStateUpdateLocalStorage(temporaryTodos, this.state.isErrorShow);
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
            <RenderAllTodos
              toDos={this.state.toDos}
              isCompleted={false}
              updateTodo={this.updateTodo}
              deleteToDo={this.deleteToDo}
              changeStateOfTodo={this.changeStateOfTodo}
            />
          </div>
          <div className="completed">
            <div className="heading2">Completed</div>
            <RenderAllTodos
              toDos={this.state.toDos}
              isCompleted={true}
              updateTodo={this.updateTodo}
              deleteToDo={this.deleteToDo}
              changeStateOfTodo={this.changeStateOfTodo}
            />
          </div>
        </ul>
        <Notification
          key={_uniqueId()}
          isErrorShow={this.state.isErrorShow}
          message={this.lastExecutedString}
          errorMessage={EMPTY_STRING_ERROR_MESSAGE}
        />
      </div>
    );
  }
}

export default App;
