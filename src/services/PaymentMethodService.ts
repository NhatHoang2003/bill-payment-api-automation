import { APIResponse, APIRequestContext } from "@playwright/test";
import { PaymentMethodRequest } from "../models/paymentMethod/PaymentMethodRequest";

export class PaymentMethodService {
    constructor(private readonly request: APIRequestContext) { }

    async getPaymentMethods(query?: PaymentMethodRequest): Promise<APIResponse> {
        return await this.request.get('/v1/payment-methods', {
            params: {
                ...query
            },
            headers: {
                Accept: 'application/json',
            }
        })
    }
}