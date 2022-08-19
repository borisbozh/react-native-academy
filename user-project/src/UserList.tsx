import UserItem from "./UserItem";
import { User } from "./user_model";

interface Props{
    users: User[];
}

export default function UserList({users}: Props){
    return (<ul className="UserList">
        {
        users.map(user => 
        (<UserItem user = {user} key={user.id} />)
        )
        }
    </ul>)
}