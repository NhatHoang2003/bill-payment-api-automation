export interface UserRequest {
    page?: number | string | boolean | any | number[];
    limit?: number | string | boolean | any | number[];
    kyc_status?: number | string | boolean | any | number[],
    search?: number | string | boolean | any | number[],
}
