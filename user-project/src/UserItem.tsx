import { User, UserStatus } from "./user_model";

interface UserItemProps{
    user: User;
}
const UserItem = ({user}: UserItemProps) =>{

    return (
        <div className="TodoItem">
            <span className="TodoItem-text">
                <span className="TodoItem-id">{user.id}</span>
                {user.firstName}
            </span>
            <span className="TodoItem-right">
                <span className="TodoItem-dateline">{user.secondName}</span>
                <span className="TodoItem-status">{UserStatus[user.status]}</span>
                {/* {
                    user.status === UserStatus.Completed?
                    <span className="TodoItem-button fas fa-check-circle"
                    onClick={handleCompletion}></span>:
                    <span className="TodoItem-button fas fa-times-circle danger"
                    onClick={() => onDelete(todo)}></span>
                } */}
{/* 
            {
                todo.status === TodoStatus.Active?
                <span className="TodoItem-button fas fa-times-circle danger1"
                    onClick={handleCompletion1}></span>:
                <span></span> */}
                </span>
        </div>
    )
}


export default UserItem;