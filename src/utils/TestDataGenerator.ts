export function generateUniqueEmail(prefix = 'test-user'): string {
    return `${prefix}.${Math.random()
        .toString(36)
        .substring(2, 8)}@example.com`
}

export function generateEmailWithLength(length: number): string {
    const domain = '@example.com';
    const localPartLength = length - domain.length;
    const localPart = 'a'.repeat(localPartLength);
    return `${localPart}${domain}`;
}