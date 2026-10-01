export interface Data {
    id: string;
    email: string;
    phone?: string | null;
    firstName: string;
    lastName: string | null;
    kycStatus: 'pending' | 'verified' | 'rejected';
    address?: Address | null;
    createAt?: string;
    updateAt?: string;
}

export interface Address {

}





