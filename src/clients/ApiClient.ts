import type { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
    constructor(private request: APIRequestContext) {}

    async get(
        endpoint: string,
        option?: Parameters<APIRequestContext['get']>[1]
    ): Promise<APIResponse> {
        return this.request.get(endpoint, option);
    }

    async post(
        endpoint: string,
        option?: Parameters<APIRequestContext['post']>[1]
    ): Promise<APIResponse> {
        return this.request.post(endpoint, option);
    }

    async put(
        endpoint: string,
        option?: Parameters<APIRequestContext['put']>[1]
    ): Promise<APIResponse> {
        return this.request.put(endpoint, option);
    }

    async delete(
        endpoint: string,
        option?: Parameters<APIRequestContext['delete']>[1]
    ): Promise<APIResponse> {
        return this.request.delete(endpoint, option);
    }

    async patch(
        endpoint: string,
        option?: Parameters<APIRequestContext['patch']>[1]
    ): Promise<APIResponse> {
        return this.request.patch(endpoint, option);
    }

    async head(
        endpoint: string,
        option?: Parameters<APIRequestContext['head']>[1]
    ): Promise<APIResponse> {
        return this.request.head(endpoint, option);
    }
}

