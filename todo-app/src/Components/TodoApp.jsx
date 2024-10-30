import { useCallback, useEffect, useState } from "react"
import { IoAddCircleOutline } from "react-icons/io5";
import TodoItem from "./TodoItem";

const TodoApp = () => {
    const [todoText, setTodoText] = useState("");
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos? (JSON.parse(savedTodos)) : []; 
    });

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])
    
    const handleChange = useCallback((e) => {
        setTodoText(e.target.value);
    }, [])

    const handleAddTodo = useCallback(() => {
        if (todoText !== "") {
            const newTodo = {
                id: Date.now(),
                text: todoText,
                completed: false,
            }
            setTodos((prevTodos) =>[newTodo, ...prevTodos])
        }
        setTodoText("");
    }, [todoText]);

    const handleDeleteTodo = useCallback((id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }, [])

    const handleToggleTodo = useCallback((id) => {
        setTodos(prevTodos => 
            prevTodos.map((todo) => id === todo.id? {...todo, completed: !todo.completed} : todo)
        )
    }, [])

    const handleEditTodo = useCallback((id, newValue) => {
        if(newValue !== "") {
            setTodos(prevTodos => {
                return prevTodos.map(todo => todo.id === id? {...todo, text: newValue}: todo)
            })
        }
    }, [])

  return (
    <div className="border border-black w-[90%] md:w-2/3 lg:1/3 p-4 my-4 rounded-md">
        <div className="border px-2 input-box flex justify-betweenc rounded-md">
            <input 
            onChange={handleChange}
            className="p-2 w-full text-sm outline-none"
            type="text" 
            placeholder="Type your too"
            />
            <button
            onClick={handleAddTodo}
            className=" text-green-500 hover:text-green-300 text-xl">
                <IoAddCircleOutline/>
            </button>
        </div>

        <div className="todo-lists border min-h-40 my-6 p-2">
            {
                todos.length > 0? (
                    <ul>
                        {
                            todos.map((item) => {
                                return <TodoItem 
                                key={item.id} 
                                item={item}
                                onToggle = {handleToggleTodo} 
                                onDelete = {handleDeleteTodo}
                                onEdit = {handleEditTodo}/>
                            })
                        }
                    </ul>
                ) : (
                    <p className="text-lg opacity-45  text-center md:text-2xl ">Your todos will show here...</p>
                )
            }
        </div>
    </div>
  )
}

export default TodoApp