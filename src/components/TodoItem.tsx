import React from "react";
import "../styles/app.scss"
// @ts-ignore
import {ReactComponent as NotePencilIcon} from "../images/note_pencil_icon.svg";

interface TodoItemProps {
    todo: Todo;
    deleteTodo: (id: Todo['id']) => void;
    selectTodoIdForEdit: (id: Todo['id']) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({todo, deleteTodo, selectTodoIdForEdit}) => {
    return <div className="container">
            <div className="card">
                <div className="face face1">
                    <div className="content">
                       <NotePencilIcon/>
                        <h3>{todo.name}</h3>
                    </div>
                </div>
                <div className="face face2">
                    <div className="content">
                        <p>{todo.description}</p>
                        <button className="button" onClick={() => selectTodoIdForEdit(todo.id)}>Edit</button>
                        <button className="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
        }
