import { store } from '../../App';
import ResponseErrorMiddleware from './response';

export default class HttpMiddleware {
  static handleResponse(api) {
    api.addResponseTransform(response => new ResponseErrorMiddleware({
      response,
      store
    }).watchForErrors());
  }
}
