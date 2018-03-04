import { call, put } from 'redux-saga/effects';
import SearchActions from '../state/searchRedux';
import { MIN_SEARCH_KEYWORD_LENGTH } from '../constants';

export function * search(api, { keyword }) {
  // Only run request if keyword length is >= MIN_SEARCH_KEYWORD_LENGTH
  if (keyword.length >= MIN_SEARCH_KEYWORD_LENGTH) {
    const res = yield call(api.search, keyword);
    if (res.ok) {
      yield put(SearchActions.searchResults(res.data));
    }
  }
}
