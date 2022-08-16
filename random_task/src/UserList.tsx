import { User } from "./UserClass";

interface Props{
    users: User[];
}

export default function TodoList({users, ...rest}: Props){
    return (<ul className="TodoList">
        {
        users.map(user =>
        
        (<UserItem todo = {user} key={user.id} {...rest} />)
        )
        
    }
    </ul>)
}