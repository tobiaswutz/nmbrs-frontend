export class User {
    constructor(
        public id: number | undefined = undefined,
        public email: string = '',
        public password: string = '',
        public firstName: string = '',
        public lastName: string = '',
        public createdAt: string = '',
        public updatedAt: string = ''
    ) { }
}