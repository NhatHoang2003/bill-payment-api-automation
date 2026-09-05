export interface Meta {
    requestId: string;
    timestamp: string;
    version: string;
    Pagination: Pagination;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    offset: number;
}