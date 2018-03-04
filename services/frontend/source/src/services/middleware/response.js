export default class ResponseErrorMiddleware {
  constructor({ response, store }) {
    this.response = response;
    this.store = store;
    this.serverError = null;
    this.error = null;
    this.setDefaultErrorMessage();
  }

  setDefaultErrorMessage() {
    if (this.response.data && this.response.data.error && this.response.data.error.message) {
      this.serverError = this.response.data.error.message;
    }
    if (this.response.data && typeof this.response.data === 'string') {
      this.serverError = this.response.data;
    }
    if (this.response.data && typeof this.response.data[0] === 'string') {
      this.serverError = this.response.data;
    }
  }

  watchForErrors() {
    switch (this.response.problem) {
    case 'CLIENT_ERROR':
      if (this.response.status === 400) {
        // ...
      } else if (this.response.status === 401) {
        // ...
      } else if (this.response.status === 403) {
        // ...
      } else if (this.response.status === 404) {
        // ...
      }
      break;
    case 'SERVER_ERROR':
      if (this.response.status === 500) {
        this.error = this.serverError || 'Internal server error 500';
      } else if (this.response.status === 502) {
        this.error = this.serverError || 'Internal server error 502';
      } else if (this.response.status === 503) {
        this.error = this.serverError || 'Internal server error 503';
      }
      break;
    case 'TIMEOUT_ERROR':
      this.error = this.serverError || 'Your request took too much time, please try again later.';
      break;
    case 'CONNECTION_ERROR':
      // ...
      break;
    case 'NETWORK_ERROR':
      // ...
      break;
    case 'CANCEL_ERROR':
      this.error = this.serverError || 'Request cancelled, or no internet connections';
      break;
    default:
      this.error = this.serverError || 'We could not handle your request!';
    }
  }
}
