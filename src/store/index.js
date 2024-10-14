import createSagaMiddleware from "redux-saga";
import saga from "../sagas";
import skillsReducer from "../reducers/skills";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";

const reducer = combineReducers({ skills: skillsReducer });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(saga);

export default store;
