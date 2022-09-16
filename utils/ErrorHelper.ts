export class ErrorHelper {
    static getResponseError(response): string {
        let message = response.error.data.message;
        if (Array.isArray(message)) {
            return message[0];
        }
        return message;
    }
}