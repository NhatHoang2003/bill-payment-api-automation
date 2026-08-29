import { APIRequestContext, APIResponse } from "@playwright/test";
import { UserRequest } from "../models/user/UserRequest";

export class UserService {
    constructor(private readonly request: APIRequestContext) { }

    async getListUsers(
        query?: UserRequest,
        token?: string
    ): Promise<APIResponse> {
        return await this.request.get('/v1/users', {
            params: {
                ...query
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
    }
}