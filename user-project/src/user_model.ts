export enum UserStatus{
    Completed, Edited
}

export class User {
    static nextId = 0;
    id = ++User.nextId;
    constructor(
        public firstName: string,
        public secondName: string,
        public username: string,
        public password: string,
        public status: UserStatus
    ) {}
}
