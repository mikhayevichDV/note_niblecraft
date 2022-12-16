import React from "react";
import "../styles/app.scss"

interface TodoItemProps {
    todo: Todo;
    deleteTodo: (id: Todo['id']) =>void;
    selectTodoIdForEdit: (id: Todo['id']) =>void;
}

export const TodoItem: React.FC<TodoItemProps> = ({todo,deleteTodo,selectTodoIdForEdit}) => {
    return <>
    <div className="card-container">
        <div className="card">
        <h3>
            {todo.name}
        </h3> <br/>
        <p>
            {todo.description}
        </p>
            <div>
                <button onClick={()=>selectTodoIdForEdit(todo.id)}>Edit</button>
                <button onClick={()=>deleteTodo(todo.id)}>Delete</button>
            </div>
        </div>
    </div>
    </>
}
