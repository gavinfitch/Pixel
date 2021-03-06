import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import photoReducer from './photo';
import albumReducer from './album';
import commentReducer from './comment';

const rootReducer = combineReducers({
  // add reducer functions here
  session: sessionReducer,
  photos: photoReducer,
  albums: albumReducer,
  comments: commentReducer
});
// const user = useSelector((store) => store.sessionReducer.user)
let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
