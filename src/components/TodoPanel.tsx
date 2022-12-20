import React, {useState} from 'react';
import "../styles/app.scss"
import {HighlightWithinTextarea} from 'react-highlight-within-textarea'

interface AddTodoPanelProps {
    mode: 'add';
    addTodo: ({name, description}: Omit<Todo, 'id'>) => void;
}

interface EditTodoPanelProps {
    mode: 'edit';
    name: string;
    description: string;
    id: string;
    editTodo: Omit<Todo, 'id'>;
    changeTodo: ({name, description, id}: { name: string, description: string, id: string }) => void;
}

type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps

const TodoPanel: React.FC<TodoPanelProps> = (props) => {
    const isEdit = props.mode === 'edit'
    const [name, setName] = useState(isEdit ? props.name : "")
    const [description, setDescription] = useState(isEdit ? props.description : "")
    const nameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }

    const descriptionChange = (value: string) => {
        setDescription(value)
    }

    const onClick = () => {
        if (isEdit) {
            return props.changeTodo({name, description, id: props.id});
        }
        props.addTodo({name, description});
        setName('');
        setDescription('');
    };

    return (
        <div className="todo-panel">
            <div>
                    <div className='name'><b>Name</b></div>
                    <input
                        type="text"
                        value={name}
                        onChange={nameChange}
                        className= {isEdit ? "edit-input" : "input-name" }
                    />
            </div>

            <div className="highlightTextarea">
                <div><b>Description</b></div>
                <div className="highlight">
                <HighlightWithinTextarea highlight={isEdit ? /#(.*?)(?= )/gm : undefined}
                                         value={description}
                                         placeholder="" onChange={descriptionChange}/>
                </div>
            </div>

            <div>
                {!isEdit && (
                    <button className="button add-btn" onClick={onClick}>
                        ADD
                    </button>
                )}
                {isEdit && (
                    <button className="button edit-btn" onClick={onClick}>
                        EDIT
                    </button>
                )}
            </div>
        </div>
    );
};

export default TodoPanel;
