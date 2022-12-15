import React from "react";
import {TodoItem} from "./TodoItem";
import TodoPanel from "./TodoPanel";
import "../styles/app.scss"

interface TodoListProps {
    todos: Todo[];
    deleteTodo: (id: Todo['id']) =>void;
    selectTodoIdForEdit: (id: Todo['id']) =>void;
    todoIdForEdit: Todo['id'] | null;
    changeTodo: ({ name, description }: Omit<Todo, 'id'>) => void;
}

export const TodoList: React.FC<TodoListProps> = ({todos, todoIdForEdit, changeTodo, deleteTodo, selectTodoIdForEdit}) => (
    <div className="list-container">
        {todos.map((todo) => {
            if (todo.id === todoIdForEdit)
                return <TodoPanel mode='edit' changeTodo={changeTodo} editTodo={todo} />;
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