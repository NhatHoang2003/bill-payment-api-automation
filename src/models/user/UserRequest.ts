export interface UserRequest {
    page?: number | string | boolean | any;
    limit?: number | string | boolean | any;
    kyc_status?: string,
    search?: string,
}