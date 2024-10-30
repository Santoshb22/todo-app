import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";

const TodoItem = ({ item, onToggle, onDelete }) => {

    if(!item) return null;
  return (
<div className=" border-b-2 flex items-center justify-between gap-1 my-2">
    <div className="flex items-center gap-1">
        <input                                                 
        onClick={() =>onToggle(item.id)}
        type="checkbox"/>
        <li className={item.completed === true? "line-through" : ""}>{item.text}</li>
    </div>

    <div className="min-w-12">
        <button 
        className="text-blue-500 align-middle text-center hover:text-blue-300">
        <FiEdit/>
        </button>

        <button 
        onClick={() => onDelete(item.id)}
        className="text-red-500 p-1 align-middle text-center text-xl hover:text-red-300"
        > 
        <TiDeleteOutline/> 
        </button>
    </div>
</div>  
)
}

export default TodoItem