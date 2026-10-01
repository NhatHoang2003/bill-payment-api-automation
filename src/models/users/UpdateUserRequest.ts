export interface UpdateUserParams {
    userId?: string | number | null | boolean | any;
}

export interface UpdateUserRequest {
    email?: string | number | null | boolean | any;
    phone?: string | number | null | boolean | any;
    firstName?: string | number | null | boolean | any;
    lastName?: string | number | null | boolean | any;
    kycStatus?: string | number | null | boolean | any;
    address?: string | number | null | boolean | any;
}