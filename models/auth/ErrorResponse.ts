export interface ErrorResponse {
    success: boolean;
    error: {
        code: string;
        message: string;
        traceId: string;
        timestamp: string;
    };
}