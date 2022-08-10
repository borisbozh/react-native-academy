export type IdType = number | undefined

export enum Roles {
    USER,
    ADMIN
}

export enum Status {
    ACTIVE,
    SUSPENDED,
    DEACTIVATED
}

export class User {
    constructor(
        public id: IdType,
        public firstName: string,
        public lastName: string,
        public username: string,
        public password: string,
        public gender: string,
        public user_role: Roles = Roles.USER,
        public pictureUrl: string,
        public description: string,
        public status: Status = Status.ACTIVE,
        public timestamp : Date,
        public modification : Date
    ) {
    }
}