import { Todo, TodoStatus } from "./todo.model";
import { FilterType, TodoListener } from "./TodoApp";
import TodoItem from "./TodoItem";
import './TodoList.css'

interface Props{
    todos: Todo[];
    filter: FilterType;
    onUpdate: TodoListener;
    onDelete: TodoListener;
}

export default function TodoList({todos, filter, ...rest}: Props){
    return (<ul className="TodoList">
        {
        todos.map(todo => 
        (<TodoItem todo = {todo} key={todo.id} {...rest} />)
        )
        }
    </ul>)
}