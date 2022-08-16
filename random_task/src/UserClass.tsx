export class User {
    static nextId = 0;
    id = ++User.nextId;
    constructor(
        public firstName: string,
        public secondName: string,
        public username: string,
        public password: string,
        public imageUrl: string,
    ) {}
}

