import { SUCCESS } from "./httpsStatus.js";

class ApiResponse {
        constructor(isSuccess, statusCode, message, data) {
                this.success = isSuccess;
                this.statusCode = statusCode;
                this.statusText = SUCCESS;
                this.message = message;
                if (data !== undefined) {
                        this.data = data;
                }
        }
}
export default ApiResponse;
