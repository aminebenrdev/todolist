import { useReducer } from "react"
import TodoContext from "./TodoContext"
import axios from "axios"
import todoReducer from "./TodoReducer"


const TodoProvider = ({children}) => {


    const initState = {
        todos: []
    }

    const [state, dispatch] = useReducer(todoReducer, initState)

    const getTodos = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:5000/api/")
            dispatch({type: "GET_TODOS", payload: response.data})
        } catch (error) {
            
        }
    }

    return <TodoContext.Provider
        value={{
            getTodos,
            todos: state.todos
        }}
    >{children}
    </TodoContext.Provider>
}

export default TodoProvider