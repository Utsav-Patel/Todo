import React from "react";
import "./index.css";
import Notification from "./Notifications";
import RenderInput from "./RenderInput";
import _uniqueId from "lodash/uniqueId";
import RenderAllTodos from "./RenderAllTodos";
import qs from "qs";
import fetch from "node-fetch";

import {
  URL,
  ADD_TODO_URL,
  DELETE_TODO_URL,
  CHANGE_STATE_OF_TODO,
  LIST_ALL_TODOS,
  NOTIFICATION,
  EMPTY_STRING_ERROR_MESSAGE
} from "./constants";

class App extends React.Component {
  lastExecutedString = "";
  timer = -1;

  constructor(props) {
    super(props);
    this.state = {
      toDos: [],
      isErrorShow: false
    };
  }

  componentDidMount() {
    fetch(LIST_ALL_TODOS, {
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/x-wwww-form-urlencoded; charset=UTF-8"
      }
    })
      .then(f => f.json())
      .then(todos => {
        this.setState({
          toDos: todos,
          isErrorShow: false
        });
      })
      .catch(err => console.log(err));
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

  updateTodoOnDB = (url, method, body) => {
    fetch(url, {
      method: method,
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: qs.stringify(body)
    });
  };

  addToDo = inputString => {
    if (!this.isEmptyString(inputString)) {
      let temporaryTodos = this.state.toDos;
      let key = _uniqueId();
      temporaryTodos.unshift({
        todo: inputString,
        key: key,
        isCompleted: false
      });
      this.setStateUpdateLocalStorage(temporaryTodos, false);
      this.lastExecutedString = NOTIFICATION.itemIsAdded + " " + inputString;
      this.updateTodoOnDB(ADD_TODO_URL, "POST", {
        todo: inputString,
        key: key,
        isCompleted: false
      });
    } else this.setStateUpdateLocalStorage(this.state.toDos, true);
    this.setTimer();
  };

  deleteToDo = (index, event) => {
    this.lastExecutedString =
      NOTIFICATION.itemIsDeleted + " " + this.state.toDos[index].todo;
    let temporaryTodos = this.state.toDos;
    this.updateTodoOnDB(DELETE_TODO_URL, "POST", this.state.toDos[index]);
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
    this.removeNotification();
    this.updateTodoOnDB(CHANGE_STATE_OF_TODO, "POST", this.state.toDos[index]);
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    this.setStateUpdateLocalStorage(temporaryTodos, this.state.isErrorShow);
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
              deleteToDo={this.deleteToDo}
              changeStateOfTodo={this.changeStateOfTodo}
            />
          </div>
          <div className="completed">
            <div className="heading2">Completed</div>
            <RenderAllTodos
              toDos={this.state.toDos}
              isCompleted={true}
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
