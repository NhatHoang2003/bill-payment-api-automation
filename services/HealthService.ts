import { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient } from '../clients/ApiClient';

export class HealthService {
    private readonly apiClient: ApiClient;

    constructor(private request: APIRequestContext) {
        this.apiClient = new ApiClient(request);
    }

    async getHealth(): Promise<APIResponse> {
        return this.apiClient.get('/health');
    }

    async getHealthDb(): Promise<APIResponse> {
        return this.apiClient.get('/health/db');
    }
}