import { useCallback, useState } from "react"
import { IoAddCircleOutline } from "react-icons/io5";
import TodoItem from "./TodoItem";

const TodoApp = () => {
    const [todoText, setTodoText] = useState("");
    const [todos, setTodos] = useState([]);

    const handleChange = useCallback((e) => {
        setTodoText(e.target.value);
    }, [])

    const handleAddTodo = useCallback(() => {
        if (todoText !== "") {
            setTodos((prevTodos) => [{ id: Date.now(), text: todoText, completed: false }, ...prevTodos]);
            setTodoText("");
        }
    }, [todoText]);

    const handleDeleteTodo = useCallback((id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }, [])

    const handleToggleTodo = useCallback((id) => {
        setTodos(prevTodos => 
            prevTodos.map((todo) => id === todo.id? {...todo, completed: !todo.completed} : todo)
        )
    }, [])



  return (
    <div className="border border-black w-2/3 p-4 my-4 rounded-sm">
        <div className=" border border-black  px-2 input-box flex justify-between">
            <input 
            onChange={handleChange}
            className="p-2 w-full rounded-sm text-sm outline-none"
            type="text" 
            placeholder="Type your too"
            />
            <button
            onClick={handleAddTodo}
            className=" text-green-500 hover:text-green-300 text-xl">
                <IoAddCircleOutline/>
            </button>
        </div>

        <div className="todo-lists border border-black my-6 p-2">
            {
                todos.length > 0? (
                    <ul>
                        {
                            todos.map((item) => {
                                return <TodoItem 
                                key={item.id} 
                                item={item}
                                onToggle = {handleToggleTodo} 
                                onDelete = {handleDeleteTodo}/>
                            })
                        }
                    </ul>
                ) : (
                    <p className="text-xs">Your todos will show here...</p>
                )
            }
        </div>
    </div>
  )
}

export default TodoApp