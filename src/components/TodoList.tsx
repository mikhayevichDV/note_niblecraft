import React from "react";
import {TodoItem} from "./TodoItem";
import TodoPanel from "./TodoPanel";
import "../styles/app.scss"

interface TodoListProps {
    todos: Todo[];
    deleteTodo: (id: Todo['id']) => void;
    selectTodoIdForEdit: (id: Todo['id']) => void;
    todoIdForEdit: Todo['id'] | null;
    changeTodo: ({name, description}: Omit<Todo, 'id'>) => void;
    selectedTag: string | null;
}

export const TodoList: React.FC<TodoListProps> = ({
                                                      todos,
                                                      todoIdForEdit,
                                                      changeTodo,
                                                      deleteTodo,
                                                      selectTodoIdForEdit,
                                                      selectedTag
                                                  }) => (
    <div className="todolist-container">
        {todos.filter(elem => {
            return selectedTag !== null ? !!elem.description.match(`^${selectedTag}(?= )|${selectedTag}(?= )|${selectedTag}$`) : true
        }).map((todo,index) => {
            if (todo.id === todoIdForEdit) {
                return <div className='container' key={index}>
                    <div className="edit-card">
                                <TodoPanel mode='edit' id={todo.id} description={todo.description} name={todo.name}
                                           changeTodo={changeTodo} editTodo={todo}/>
                </div>
                </div>
            }
            return (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    deleteTodo={deleteTodo}
                    selectTodoIdForEdit={selectTodoIdForEdit}
                />
            );
        })}
    </div>
)
