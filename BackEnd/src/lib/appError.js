class AppError extends Error {
        constructor() {
                super();
        }
        init(isSuccess, status, statusText, message) {
                this.isSuccess = isSuccess;
                this.status = status;
                this.statusText = statusText;
                this.message = message;
                return this;
        }
}

const appError = new AppError();
export default appError;