import { APIRequestContext, APIResponse } from "@playwright/test";
import { UserRequest } from "../models/users/ListUserRequest";
import { CreateMiniUser } from "../models/users/CreateUserRequest";
import { GetUserByIdRequest } from "../models/users/GetUserByIdRequest";
import { UpdateUserParams, UpdateUserRequest } from "../models/users/UpdateUserRequest";
import { ApiClient } from "../clients/ApiClient";

export class UserService {

    private readonly apiClient: ApiClient

    constructor(private readonly request: APIRequestContext) {
        this.apiClient = new ApiClient(request)
    }

    async getListUsers(
        payload?: UserRequest,
        token?: string
    ): Promise<APIResponse> {

        return await this.apiClient.get('/v1/users', {
            params: {
                ...payload
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

        return await this.apiClient.post('/v1/users', {
            data: payload,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }

    async getUserById(
        payload: GetUserByIdRequest,
        token?: string
    ): Promise<APIResponse> {

        const encodedUserId = encodeURIComponent(String(payload.userId));

        return await this.apiClient.get(`/v1/users/${encodedUserId}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
    }

    async putUpdateUser(
        params: UpdateUserParams,
        payload?: UpdateUserRequest,
        token?: string
    ): Promise<APIResponse> {
        const encodedUserId = encodeURIComponent(String(params.userId));

        return await this.apiClient.put(`/v1/users/${encodedUserId}`, {
            data: payload,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }

    async patchUpdateUser(
        params: UpdateUserParams,
        payload?: UpdateUserRequest,
        token?: string
    ): Promise<APIResponse> {
        const encodedUserId = encodeURIComponent(String(params.userId));

        return await this.apiClient.patch(`/v1/users/${encodedUserId}`, {
            data: payload,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    }

    async deleteUserById(
        payload: GetUserByIdRequest,
        token?: string
    ): Promise<APIResponse> {

        const encodedUserId = encodeURIComponent(String(payload.userId));

        return await this.apiClient.get(`/v1/users/${encodedUserId}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
    }
}