import { FunctionComponent } from "react";

interface TaskProps {
    id: number,
    name: string,
    description: string,
    isCompleted : boolean,
    onDelete: (id: number) => void,
    onUpdate: (id: number) => void,
}
 
const Task: FunctionComponent<TaskProps> = ({id, name, description, isCompleted, onDelete, onUpdate}) => {
    

    return ( 
        <div className="task-container">
            <div className="task">
                <p>{name}</p>
                <p>{description}</p>
                <p>{isCompleted}</p>
                <form>
                    <input type="checkbox" checked={isCompleted}></input>
                </form>
                <button onClick={() => onUpdate(id) }>Alterar</button>
                <button onClick={() => onDelete(id)}>Deletar</button>
            </div>
        </div>
     );
}
 
export default Task;