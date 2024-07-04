export const USER_SERVICE = "USER_SERVICE"

export interface IUserService {
    create: (data: any) => Promise<any>
    findById: (id: number) => Promise<any>
    findOne: (email: string, password: string) => Promise<any>
    signIn: (email: string, password: string) => Promise<string>;
}
