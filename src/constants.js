const URL = "https://evening-badlands-81713.herokuapp.com";
const ADD_TODO_URL = URL + "/addTodo";
const DELETE_TODO_URL = URL + "/deleteTodo";
const CHANGE_STATE_OF_TODO_URL = URL + "/changeStateOfTodo";
const LIST_ALL_TODOS_URL = URL + "/listAllTodos";

const NOTIFICATION = {
  itemIsAdded: "Added Todo: ",
  itemIsDeleted: "Deleted Todo: "
};
const EMPTY_STRING_ERROR_MESSAGE = "Enter non-empty String";

export {
  URL,
  ADD_TODO_URL,
  DELETE_TODO_URL,
  CHANGE_STATE_OF_TODO_URL,
  LIST_ALL_TODOS_URL,
  NOTIFICATION,
  EMPTY_STRING_ERROR_MESSAGE
};
