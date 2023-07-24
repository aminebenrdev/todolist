import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, CSSProperties } from 'react';
import ClipLoader from "react-spinners/ClipLoader"

import taskSlice, { getTasks, deleteTask, addTask, doneTask } from '../../feature/task/taskSlice';


import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';
import './tasks.css';


const override: CSSProperties = {
    display: "block",
    margin: "0 auto"
};


function Tasks() {

    const { loading, tasks } = useSelector(state => state.task)

    const [isCompletedScreen, setIsCompletedScreen] = useState(false)
    const [completedTasks, setCompletedTasks] = useState([])
    const [incompleteITasks, setIncompleteITasks] =useState([])
    const [newTaskTitle, setNewTaskTitle] =useState("")
    const [newTaskDescription, setNewTaskDescription] =useState("")

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTasks())
    }, [])

    useEffect(() => {
        setCompletedTasks(tasks.filter(item => item.is_completed))
        setIncompleteITasks(tasks.filter(item => !item.is_completed))
    }, [tasks])

    return (
        <>
            <h1>My Todos</h1>

            <div className="todo-wrapper">

                <div className="todo-input">
                    <div className="todo-input-item">
                    <label>タイトル:</label>
                    <input
                        type="text"
                        value={newTaskTitle}
                        placeholder="タスクのタイトル"
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                    </div>
                    <div className="todo-input-item">
                    <label>説明:</label>
                    <input
                        type="text"
                        value={newTaskDescription}
                        placeholder="タスクの説明"
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                    />
                    </div>
                    <div className="todo-input-item">
                    <button
                        className="primary-btn"
                        type="button"
                        onClick={() => {
                            dispatch(addTask({title: newTaskTitle, description: newTaskDescription}))
                            setNewTaskTitle('')
                            setNewTaskDescription('')
                        }}
                    >
                        追加
                    </button>
                    </div>
                </div>
                <div className="btn-area">
                    <button
                    className={`secondaryBtn ${isCompletedScreen === false && 'active'}`}
                    onClick={() => setIsCompletedScreen (false)}
                    >
                    未了 ({incompleteITasks.length})
                    </button>
                    <button
                    className={`secondaryBtn ${isCompletedScreen === true && 'active'}`}
                    onClick={() => setIsCompletedScreen (true)}
                    >
                    完了 ({completedTasks.length})
                    </button>
                </div>
                <div className="todo-list">

                <ClipLoader
                    color="#fff"
                    loading={loading}
                    cssOverride={override}
                    size={50}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />

                    {isCompletedScreen === false &&
                    (
                        incompleteITasks.length === 0 ? (
                              <p>表示するタスクはありません。</p>
                          ) : (incompleteITasks.map( task => (
                            <div className="todo-list-item" key={task.id}>
                                <div>
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                </div>
                                <div className='flex-buttons'>
                                    <AiOutlineDelete
                                    title="Delete"
                                    className="icon"
                                    onClick={() => dispatch(deleteTask(task.id))}
                                    size="20"
                                    />
                                    <BsCheckLg
                                    title="Completed"
                                    className=" check-icon"
                                    size="20"
                                    onClick={() => dispatch(doneTask(task.id))}
                                    />
                                </div>
                            </div>
                        )))
                    )}

                    {isCompletedScreen === true &&
                    (
                        completedTasks.length === 0 ? (
                            <p>表示するタスクはありません。</p>
                        ) : (completedTasks.map( task => (
                            <div className="todo-list-item" key={task.id}>
                                <div>
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                    <p> <i>完了時刻:: {task.completedat}</i></p>
                                </div>
                                <div>
                                    <AiOutlineDelete
                                    className="icon"
                                    size="20"
                                    onClick={() => dispatch(deleteTask(task.id))}
                                    />
                                </div>
                            </div>
                        )))
                    )}
                </div>
            </div>
        </>
    )
}

export default Tasks