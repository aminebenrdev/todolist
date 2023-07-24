import { useState, useEffect, useContext } from 'react';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';
import './Todos.css';
import TodoContext from './TodoContext';



function TodosList() {

    const { getTodos, todos } = useContext(TodoContext)
    
    const [isCompletedScreen, setIsCompletedScreen] = useState(false)
    const [completedItems, setCompletedItems] = useState([])
    const [incompleteItems, setIncompleteItems] =useState([])


    useEffect(() => {
        getTodos()
    }, [])


    useEffect(() => {
        setCompletedItems(todos.filter(item => item.is_completed))
        setIncompleteItems(todos.filter(item => !item.is_completed))
    }, [todos])

    return (
        <>
            <h1>My Todos</h1>

            <div className="todo-wrapper">

                <div className="todo-input">
                    <div className="todo-input-item">
                    <label>Title:</label>
                    <input
                        type="text"
                        value=""
                        onChange=""
                        placeholder="What's the title of your To Do?"
                    />
                    </div>
                    <div className="todo-input-item">
                    <label>Description:</label>
                    <input
                        type="text"
                        value=""
                        onChange=""
                        placeholder="What's the description of your To Do?"
                    />
                    </div>
                    <div className="todo-input-item">
                    <button
                        className="primary-btn"
                        type="button"
                        onClick=""
                    >
                        Add
                    </button>
                    </div>
                </div>
                <div className="btn-area">
                    <button
                    className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
                    onClick={() => setIsCompletedScreen (false)}
                    >
                    To Do ({incompleteItems.length})
                    </button>
                    <button
                    className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
                    onClick={() => setIsCompletedScreen (true)}
                    >
                    Completed ({completedItems.length})
                    </button>
                </div>
                <div className="todo-list">

                    {isCompletedScreen === false &&
                    (
                        incompleteItems && incompleteItems.map( todo => (
                            <div className="todo-list-item">
                                <div>
                                    <h3>{todo.title}</h3>
                                    <p>{todo.description}</p>
                                </div>
                                <div className='flex-buttons'>
                                    <AiOutlineDelete
                                    title="Delete"
                                    className="icon"
                                    onClick=""
                                    size="20"
                                    />
                                    <BsCheckLg
                                    title="Completed"
                                    className=" check-icon"
                                    onClick=""
                                    size="20"
                                    />
                                </div>
                            </div>
                        ))
                    )}

                    {isCompletedScreen === true &&
                    (
                        completedItems && completedItems.map( todo => (
                            <div className="todo-list-item">
                                <div>
                                    <h3>{todo.title}</h3>
                                    <p>{todo.description}</p>
                                    <p> <i>Completed at: {todo.completedat}</i></p>
                                </div>
                                <div>
                                    <AiOutlineDelete
                                    className="icon"
                                    onClick=""
                                    size="20"
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    )
}

export default TodosList