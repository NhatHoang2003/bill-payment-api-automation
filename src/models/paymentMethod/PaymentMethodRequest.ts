export interface PaymentMethodRequest {
    page?: number;
    limit?: number;
    user_id?: string;
    type?: string;
    is_active?: boolean;
}