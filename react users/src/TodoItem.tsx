import React from "react";
import { Todo, TodoStatus } from "./todo.model";
import { TodoListener } from "./TodoApp";
import './TodoItem.css'

interface TodoItemProps{
    todo: Todo;
    onUpdate: TodoListener;
    onDelete: TodoListener;
}

const TodoItem = ({todo, onDelete, onUpdate}: TodoItemProps) =>{
    function handleCompletion(event:React.MouseEvent){
        event.preventDefault()
        onUpdate({...todo, status: TodoStatus.Completed})
    }
    function handleCompletion1(event:React.MouseEvent){
        event.preventDefault()
        onUpdate({...todo, status: TodoStatus.Canceled})
    }
    return (
        <div className="TodoItem">
            <span className="TodoItem-text">
                <span className="TodoItem-id">{todo.id}</span>
                {todo.firstName}
            </span>
            <span className="TodoItem-right">
                <span className="TodoItem-dateline">{todo.secondName}</span>
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