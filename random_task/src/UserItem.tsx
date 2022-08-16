import { UserListener } from "./UserApp";
import { User } from "./UserClass";

interface TodoItemProps{
    user: User[];
    onUpdate: UserListener;
}

const TodoItem = ({user, onUpdate}: TodoItemProps) =>{
    function handleCompletion(event:React.MouseEvent){
        event.preventDefault()
        onUpdate({...user})
    }

    return (
        <div className="TodoItem">
            <span className="TodoItem-text">
                <span className="TodoItem-id">{user.id}</span>
                {user.firstName}
            </span>
            <span className="TodoItem-right">
                <span className="TodoItem-dateline">{todo.deadline.toDateString()}</span>
                <span className="TodoItem-status">{TodoStatus[todo.status]}</span>
                {
                    todo.status === TodoStatus.Active?
                    <span className="TodoItem-button fas fa-check-circle"
                    onClick={handleCompletion}></span>:
                    <span className="TodoItem-button fas fa-times-circle danger"
                    onClick={() => onDelete(todo)}></span>
                }

            {
                todo.status === TodoStatus.Active?
                <span className="TodoItem-button fas fa-times-circle danger1"
                    onClick={handleCompletion1}></span>:
                <span></span>
            /* <span className="TodoItem-button fas fa-times-circle danger1"
                    onClick={handleCompletion1}></span> */}
            </span>
        </div>
    )
}

export default TodoItem;