import React, {useRef, useState} from 'react';
import Header from "./components/Header";
import TodoPanel from "./components/TodoPanel";
import {TodoList} from "./components/TodoList";
import {uniqValue} from "./utils";
import TagsPanel from "./components/TagsPanel";

function App() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [todoIdForEdit, setTodoIdForEdit] = useState<Todo['id'] | null>(null)
    const [tags, setTags] = useState<string[]>([])
    const [selectedTag, setSelectedTag] = useState<string | null>(null)
    const todosJSON = useRef({})

    const findTags = (str: string): any => {
        return str.split(" ").map((elem, index) => {
            switch (elem[0]) {
                case "#":
                    if (tags.includes(elem)) {
                        return 0;
                    } else {
                        return setTags([...tags, elem]);
                    }
                default:
                    return 0;
            }
        })
    }

    const addTodo = ({name, description}: Omit<Todo, 'id'>) => {
        if (name.length === 0 || description.length === 0) return 0
        if (!name.trim() || !description.trim()) return 0
        setTodos([...todos, {id: uniqValue(), description, name}]);
        todosJSON.current = JSON.stringify([...todos, {id: uniqValue(), description, name}]);
        findTags(description);
    }

    const deleteTodo = (id: Todo['id']) => {
        setTodos(todos.filter(todo => todo.id !== id))

    }

    const selectTodoIdForEdit = (id: Todo['id']) => {
        setTodoIdForEdit(id)
    }

    const changeTodo = ({name, description}: Omit<Todo, 'id'>) => {
        if (name.length === 0 || description.length === 0) return 0
        if (!name.trim() || !description.trim()) return 0
        setTodos(
            todos.map((todo) => {
                if (todo.id === todoIdForEdit) {
                    findTags(description);
                    return {...todo, name, description};
                }
                return todo;
            })
        );
        setTodoIdForEdit(null);
    };

    const selectTag = (value: string | null): void => {
        setSelectedTag(value)
    }

    const deleteTag = (tagValue: string) => {
        setTags(prev => prev.filter(elem => elem !== tagValue))
    }

    return <div className="app-container">
        <div className='panel-container'>
        <Header todoCount={todos.length}/>
        <TagsPanel tags={tags} deleteTag={deleteTag} selectTag={selectTag}/>
        <TodoPanel
            mode='add'
            addTodo={addTodo}
        />
    </div>
        <TodoList
            todos={todos}
            todoIdForEdit={todoIdForEdit}
            deleteTodo={deleteTodo}
            selectTodoIdForEdit={selectTodoIdForEdit}
            changeTodo={changeTodo}
            selectedTag={selectedTag}
        />
    </div>
}

export default App;
