import React from "react";
import "./index.css";
import Notification from "./Notifications";
import RenderInput from "./RenderInput";
import _uniqueId from "lodash/uniqueId";
import RenderAllTodos from "./RenderAllTodos";
import fetch from "node-fetch";

import {
  ADD_TODO_URL,
  DELETE_TODO_URL,
  CHANGE_STATE_OF_TODO_URL,
  LIST_ALL_TODOS_URL,
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
    fetch(LIST_ALL_TODOS_URL, {
      headers: {
        "Content-Type": "application/json"
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

  setState(toDos, isErrorShow) {
    this.setState({
      toDos: toDos,
      isErrorShow: isErrorShow
    });
  }

  updateTodoOnDB = (url, method, body) => {
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  };

  addToDo = inputString => {
    if (!this.isEmptyString(inputString)) {
      let temporaryTodos = this.state.toDos;
      fetch(ADD_TODO_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          todo: inputString,
          isCompleted: false
        })
      })
        .then(f => f.json())
        .then(key => {
          temporaryTodos.push({
            todo: inputString,
            _id: key["_id"],
            isCompleted: false
          });
          this.setState(temporaryTodos, false);
          this.lastExecutedString =
            NOTIFICATION.itemIsAdded + " " + inputString;
        })
        .catch(err => console.dir(err));
    } else this.setState(this.state.toDos, true);
    this.setTimer();
  };

  deleteToDo = (index, event) => {
    this.lastExecutedString =
      NOTIFICATION.itemIsDeleted + " " + this.state.toDos[index].todo;
    let temporaryTodos = this.state.toDos;
    temporaryTodos.splice(index, 1);
    this.updateTodoOnDB(DELETE_TODO_URL, "POST", this.state.toDos[index]);
    this.setState(temporaryTodos, false);
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
    this.removeNotification();
    this.updateTodoOnDB(
      CHANGE_STATE_OF_TODO_URL,
      "POST",
      this.state.toDos[index]
    );
    let temporaryTodos = this.state.toDos;
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    this.setState(temporaryTodos, this.state.isErrorShow);
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
