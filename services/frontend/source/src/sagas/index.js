import { takeLatest, all } from 'redux-saga/effects';

/* ----------- Api Service ----------- */
import API from '../services/api.js';

/* ------------- Types ------------- */

import { SearchTypes } from '../state/searchRedux';

/* ------------- Sagas ------------- */

import { search } from './searchSagas';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function * root() {
  yield all([
    takeLatest(SearchTypes.SEARCH_NEW, search, api)
  ]);
}
