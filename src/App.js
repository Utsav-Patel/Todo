import React from "react";
import "./index.css";
import Notification from "./Notifications";
import MyButtons from "./Buttons";
import RenderTodo from "./RenderTodo";
import RenderInput from "./RenderInputComponent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toDos: [],
      notification: {
        itemIsAdded: "Added Todo: ",
        itemIsDeleted: "Deleted Todo: ",
        inputStringIsEmpty: "Enter non-empty String"
      },
      lastExecutedString: ""
    };
  }

  addToDo = () => {
    if (!(this.inputString.value === "")) {
      this.setState({
        toDos: [...this.state.toDos, this.inputString.value],
        lastExecutedString:
          this.state.notification.itemIsAdded + " " + this.inputString.value
      });
    } else {
      this.setState({
        lastExecutedString: this.state.notification.inputStringIsEmpty
      });
    }
  };

  deleteToDo = (index, event) => {
    let temporaryString = this.state.toDos[index];
    let temporaryTodos = this.state.toDos;
    event.target.parentElement.style.display = "none";
    // temporaryTodos.splice(index,1);
    this.setState({
      toDos: temporaryTodos,
      lastExecutedString:
        this.state.notification.itemIsDeleted + " " + temporaryString
    });
  };

  clearInputString = () => {
    this.inputString.value = "";
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
        <div className="setWidth">
          <div className="heading">todos</div>
          <ul>
            {this.state.toDos.map((item, index) => (
              <RenderTodo
                key={index}
                item={item}
                deleteToDo={this.deleteToDo.bind(this, index)}
                changeStateOfTodo={this.changeStateOfTodo}
              />
            ))}
          </ul>
          <RenderInput instance={this} />
          <MyButtons
            addToDo={this.addToDo}
            clearInputString={this.clearInputString}
          />
          <Notification
            notificationNumber={this.state.notificationNumber}
            lastExecutedString={this.state.lastExecutedString}
          />
        </div>
      </div>
    );
  }
}

export default App;
