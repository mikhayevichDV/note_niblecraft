import React, {useState} from 'react';
import "../styles/app.scss"

const DEFAULT_TODO = {
    name:'',
    description: ""
}


interface AddTodoPanelProps {
    mode: 'add';
    addTodo: ({name,description}: Omit<Todo, 'id'>) => void;
}
interface EditTodoPanelProps {
    mode: 'edit';
    editTodo: Omit<Todo, 'id'>;
    changeTodo: ({name,description}: Omit<Todo, 'id'>) => void;
}

type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps

const TodoPanel: React.FC<TodoPanelProps> = (props) => {
    const isEdit = props.mode ==='edit'
    const [todo, setTodo] = useState(isEdit ?  props.editTodo : DEFAULT_TODO)
    const [test, setTest] = useState("")

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setTodo({...todo,[name]:value});
    }

    const onClick = () => {
        if (isEdit) {
            return props.changeTodo(todo);
        }
        props.addTodo(todo);
        setTodo(DEFAULT_TODO);
    };

    const createLabelValue = (value:string):Array<JSX.Element | string> => {
        return  value.split(' ').map((elem,index)=>{
            switch (elem[0]) {
                case '#': return index!==0 ?  <span> {elem}</span> : <span>{elem}</span>
                default: return index!==0 ? ` ${elem}` : elem
            }
        })
        // const arr = value.split(' ').reduce((acc:string,elem:string)=>{
        //    return value[0]==="#" ? `<span>  </span>` :
        // },"")
    }

    return (
        <div>
            <div>
            <label htmlFor="name">
                <div>Name</div>
                <input
                    type="text"
                    id='name'
                    value={todo.name}
                    name="name"
                    onChange={onChange}
                />

                <div className='labelContainer'>
                <textarea id='input1' className='input2' value={test} onChange={(e)=>setTest(e.currentTarget.value)}/>
                <label htmlFor='input1' className='labelInput'> {createLabelValue(test)} </label>
                </div>

            </label>
            </div>
            <div>
                <label htmlFor="name">
                    <div>Description</div>
                    <input
                        type="text"
                        id='description'
                        value={todo.description}
                        name="description"
                        onChange={onChange}
                    />
                </label>
            </div>
            <div>
                {!isEdit && (
                    <button  onClick={onClick}>
                        ADD
                    </button>
                )}
                {isEdit && (
                    <button  onClick={onClick}>
                        EDIT
                    </button>
                )}
            </div>
        </div>
    );
};

export default TodoPanel;