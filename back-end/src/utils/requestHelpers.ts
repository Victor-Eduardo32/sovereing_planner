export function getUserIdFromHeaders(headers: any): string {
    const user_id = headers['user_id'];
    return Array.isArray(user_id) ? user_id[0] : user_id || '';
}