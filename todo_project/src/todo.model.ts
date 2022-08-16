export enum TodoStatus {
    Active = 1, Completed, Canceled
}

export class Todo {
    static nextId = 0;
    id = ++Todo.nextId;
    constructor(
        public firstName: string,
        public secondName: string,
        public username: string,
        public password: string,
        public status: TodoStatus
    ) {}
}