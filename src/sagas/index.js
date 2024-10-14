import { CHANGE_SEARCH_FIELD, SEARCH_SKILLS_REQUEST } from "../actions/actionTypes";
import { debounce, put, retry, spawn, takeLatest } from "redux-saga/effects";
import { searchSkills } from "../api";
import { searchSkillsFailure, searchSkillsRequest, searchSkillsSuccess } from "../actions/actionCreators";

function filterChangeSearchAction({ type, payload }) {
  return type === CHANGE_SEARCH_FIELD && payload.search.trim() !== "";
}

function* handleChangeSearchSaga(action) {
  yield put(searchSkillsRequest(action.payload.search));
}

function* handleSearchSkillsSaga(action) {
  try {
    const retryCount = 3;
    const retryDelay = 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      searchSkills,
      action.payload.search,
    );

    yield put(searchSkillsSuccess(data));
  }
  catch (e) {
    yield put(searchSkillsFailure(e.message));
  }
}

function* watchChangeSearchSaga() {
  yield debounce(300, filterChangeSearchAction, handleChangeSearchSaga);
}

function* watchSearchSkillsSaga() {
  yield takeLatest(SEARCH_SKILLS_REQUEST, handleSearchSkillsSaga);
}

export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
}
