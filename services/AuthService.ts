import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from '../clients/ApiClient';
import { TokenRequest } from '../models/auth/TokenRequest';

export class AuthService {
    private readonly apiClient: ApiClient;

    constructor(private request: APIRequestContext) {
        this.apiClient = new ApiClient(request);
    }

    async getTokenJson(body: TokenRequest): Promise<APIResponse> {
        return this.apiClient.post('/oauth/token', {
            data: body 
        });
    }

    async getTokenForm(body: TokenRequest): Promise<APIResponse> {
        const formData = new URLSearchParams();

        for (const [key, value] of Object.entries(body)) {
            formData.append(key, value ?? '');
        }

        return this.apiClient.post('/oauth/token', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: formData.toString(),
        });
    }
}