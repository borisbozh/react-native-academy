import React, { Component } from 'react';
import { Todo, TodoStatus } from './todo.model';
import { TodoListener } from './TodoApp';

interface TodoInputProps {
    onCreateTodo: TodoListener
}

interface TodoInputState {
    firstName: string;
    secondName: string;
    username: string;
    password: string;
}

class TodoInput extends Component<TodoInputProps, TodoInputState> {
    state: Readonly<TodoInputState> = {
        firstName: "",
    secondName: "",
    username: "",
    password: ""
    }
    
    handleTodoSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.props.onCreateTodo(new Todo(
            this.state.firstName, this.state.secondName, this.state.username, this.state.password, TodoStatus.Completed
         ));
         this.setState({firstName: "",
         secondName: "",
         username: "",
         password: ""})
    }

    handleTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name as keyof TodoInputState & string;
        const stateUpdate = {[fieldName]: event.target.value} as unknown as TodoInputState;
        this.setState(stateUpdate);
    }

    handletodoReset = (event: React.MouseEvent) => {
        event.preventDefault();
        this.setState({firstName: "",
        secondName: "",
        username: "",
        password: ""})
    }

    render() {
        return (
            <form className="TodoInput-form" onSubmit={this.handleTodoSubmit}>
                <label htmlFor="TodoInput-todo-text">What to do next?</label>
                <input type="text" id="TodoInput-todo-text" name="firstName" value={this.state.firstName}
                    onChange={this.handleTextChanged} />
                    <input type="text" id="TodoInput-todo-text1" name="secondName" value={this.state.secondName}
                    onChange={this.handleTextChanged} />
                    <input type="text" id="TodoInput-todo-text2" name="username" value={this.state.username}
                    onChange={this.handleTextChanged} />
                    <input type="text" id="TodoInput-todo-text3" name="password" value={this.state.password}
                    onChange={this.handleTextChanged} />
                <button className='button button5' type="submit">Add TODO</button>
                <button className='button button3' type="reset" onClick={this.handletodoReset}>Reset</button>
            </form>
        );
    }
}

export default TodoInput;