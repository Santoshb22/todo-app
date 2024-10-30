import { TiDeleteOutline } from "react-icons/ti";
import { FiEdit } from "react-icons/fi";
import { useState } from "react";
import { MdDone } from "react-icons/md";

const TodoItem = ({ item, onToggle, onDelete, onEdit}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedValue, setUpdatedValue] = useState(item.text);

    const handleSave = () => {
        onEdit(item.id, updatedValue);
        setIsEditing(false);
    }
  return (
<div className=" border-b-2 flex items-center justify-between gap-1 my-2">
    <div className="flex items-center gap-1">
        {
            isEditing? <button onClick={() => {
                onEdit(item.id, updatedValue);
                setIsEditing(false);
            }}>
                    <MdDone/>
                </button>
            : 
            <input                                                 
            onClick={() =>onToggle(item.id)}
            type="checkbox"/>
        }

        {
            isEditing? <input
            className="border px-1"
            onChange={(e) => setUpdatedValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            type="text" 
            value={updatedValue}/>
            : 
            <li className={item.completed === true? "line-through" : ""}>
                {item.text}
            </li>
        }
    </div>

    <div className="min-w-12">
        {!item.completed && <button 
        onClick={() => {
            setIsEditing(true);
        }}
        className="text-blue-500 align-middle text-center hover:text-blue-300">
            <FiEdit/>
        </button>}

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