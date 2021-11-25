export class User {
    id: number
    email: string
    name: string | null
}
export class UserAuth extends User {
    password: string
}