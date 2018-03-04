import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { MIN_SEARCH_KEYWORD_LENGTH } from '../constants';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  searchNew: [ 'keyword' ],
  searchResults: [ 'searchResults' ]
});

export const SearchTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  loading: false,
  keyword: '',
  results: []
});

/* ------------- Reducers ------------- */

export const searchNew = (state, { keyword }) =>
  state.merge({
    // Only put loading in state if keyword length is >= MIN_SEARCH_KEYWORD_LENGTH
    loading: keyword.length >= MIN_SEARCH_KEYWORD_LENGTH,
    results: [],
    keyword
  });

export const results = (state, { searchResults }) =>
  state.merge({ loading: false, results: searchResults });

export const reset = state =>
  INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEARCH_NEW]: searchNew,
  [Types.SEARCH_RESULTS]: results
});
