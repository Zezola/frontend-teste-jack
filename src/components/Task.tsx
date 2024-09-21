import { FunctionComponent } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface TaskProps {
    id: number,
    name: string,
    description: string,
    isCompleted : boolean,
    onDelete: (id: number) => void,
    onUpdate: (id: number) => void,
}
 
const Task: FunctionComponent<TaskProps> = ({id, name, description, isCompleted, onDelete, onUpdate}) => {
    const navigate = useNavigate();

    return ( 
        <div className="task-container">
            <div className="task">
                <p>{name}</p>
                <p>{description}</p>
                <p>{isCompleted}</p>
                <form>
                    <input type="checkbox" checked={isCompleted}></input>
                </form>
                <button onClick={() => navigate(`/task/${id}`) }>Alterar</button>
                <button onClick={() => onDelete(id)}>Deletar</button>
            </div>
        </div>
     );
}
 
export default Task;