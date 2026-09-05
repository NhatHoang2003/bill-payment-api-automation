import { APIRequestContext, APIResponse } from "@playwright/test";
import { UserRequest } from "../models/users/ListUserRequest";
import { CreateMiniUser } from "../models/users/CreateUserRequest";
import { GetUserByIdRequest } from "../models/users/GetUserByIdRequest";

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

    async postCreateUser(
        payload?: CreateMiniUser | string,
        token?: string
    ): Promise<APIResponse> {

        return await this.request.post('/v1/users', {
            data: payload,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }

    async getUserById(
        query: GetUserByIdRequest,
        token?: string
    ): Promise<APIResponse> {

        const encodedUserId = encodeURIComponent(String(query.userId));

        return await this.request.get(`/v1/users/${encodedUserId}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
    }


}