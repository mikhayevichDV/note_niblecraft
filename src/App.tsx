import React, {useRef, useState} from 'react';
import Header from "./components/Header";
import TodoPanel from "./components/TodoPanel";
import {TodoList} from "./components/TodoList";
import {uniqValue} from "./utils";
import TagsPanel from "./components/TagsPanel";

const DEFAULT_TODO_LIST = [
  { id: uniqValue(), name: 'task 1', description: 'description 1' },
  { id: uniqValue(), name: 'task 2', description: 'description 2' },
  { id: uniqValue(), name: 'task 3', description: 'description 3'},
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(DEFAULT_TODO_LIST)
  const [todoIdForEdit, setTodoIdForEdit] = useState<Todo['id'] | null>(null)
  const [tags, setTags] = useState<any[]>([])
  const todosJSON = useRef({})

  const findTags = (str:string):any => {
    return str.split(" ").map((elem,index)=>{
      switch (elem[0]) {
        case "#":
           if (tags.includes(elem)) {
            return 0;
           } else {
             return setTags([...tags,elem]);
           }
        default: return 0;
      }
    })
  }

  const addTodo = ({name,description}: Omit<Todo, 'id'>) => {
    if (name.length === 0 || description.length === 0 ) return 0
    setTodos([...todos, { id: uniqValue(), description, name }]);
    todosJSON.current = JSON.stringify([...todos, { id: uniqValue(), description, name }]);
    findTags(description);
  }

  const deleteTodo = (id:Todo['id']) => {
    setTodos(todos.filter(todo=> todo.id !==id))
  }

  const selectTodoIdForEdit = (id:Todo['id']) => {
    setTodoIdForEdit(id)
  }

  const changeTodo = ({ name, description }: Omit<Todo, 'id'>) => {
    if (name.length === 0 || description.length === 0 ) return 0
    setTodos(
        todos.map((todo) => {
          if (todo.id === todoIdForEdit) {
            return { ...todo, name, description };
          }
          return todo;
        })
    );
    setTodoIdForEdit(null);
  };

  const filterTag = (tags:any,tag:string) => {
    tags.tags.filter((elem: string)=>elem===tag)
  }

  return <div>
    <Header todoCount={todos.length}/>
    <TagsPanel tags={tags} />
    <TodoPanel
        mode='add'
        addTodo={addTodo}
    />
    <TodoList
        todos={todos}
        todoIdForEdit={todoIdForEdit}
        deleteTodo={deleteTodo}
        selectTodoIdForEdit={selectTodoIdForEdit}
        changeTodo={changeTodo}
    />
  </div>
}

export default App;
