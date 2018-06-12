import React from "react";
import "./index.css";
import Notification from "./Notifications";
import MyButtons from "./Buttons";
import RenderTodo from "./RenderTodo";
import RenderInput from "./RenderInputComponent";
import _uniqueId from "lodash/uniqueId";

const notification = {
  itemIsAdded: "Added Todo: ",
  itemIsDeleted: "Deleted Todo: "
};

const emptyStringErrorMessage = "Enter non-empty String";

class App extends React.Component {
  myNeededString = {
    lastExecutedString: "",
    inputString: ""
  };

  constructor(props) {
    super(props);
    this.state = {
      toDos: [],
      isErrorShow: false
    };
  }

  addToDo = () => {
    if (!(this.myNeededString.inputString.value === "")) {
      this.setState({
        toDos: [
          ...this.state.toDos,
          { todo: this.myNeededString.inputString.value, key: _uniqueId() }
        ],
        isErrorShow: false
      });
      this.lastExecutedString =
        notification.itemIsAdded + " " + this.myNeededString.inputString.value;
    } else {
      this.setState({
        isErrorShow: true
      });
    }
  };

  deleteToDo = (index, event) => {
    this.lastExecutedString =
      notification.itemIsDeleted + " " + this.state.toDos[index].todo;
    let temporaryTodos = this.state.toDos;
    temporaryTodos.splice(index, 1);
    this.setState({
      toDos: temporaryTodos
    });
  };

  clearInputString = () => {
    this.myNeededString.inputString.value = "";
  };

  onSpecialKey = event => {
    if (event.key === "Enter") {
      this.addToDo();
      this.clearInputString();
    }
  };

  changeStateOfTodo = event => {
    event.target.classList.toggle("checked");
  };

  render() {
    return (
      <div className="app">
        <div className="heading">todos</div>
        <ul>
          {this.state.toDos.map((item, index) => (
            <RenderTodo
              key={item.key}
              item={item}
              deleteToDo={this.deleteToDo.bind(this, index)}
              changeStateOfTodo={this.changeStateOfTodo}
            />
          ))}
        </ul>
        <RenderInput
          onSpecialKey={this.onSpecialKey}
          myNeededString={this.myNeededString}
        />
        <MyButtons
          addToDo={this.addToDo}
          clearInputString={this.clearInputString}
        />
        <Notification
          isErrorMessage={this.state.isErrorShow}
          lastExecutedString={this.lastExecutedString}
          errorString={emptyStringErrorMessage}
        />
      </div>
    );
  }
}

export default App;
