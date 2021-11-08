import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import authReducer from './auth'
import workspaceReducer from './workspace';
import boardReducer from './board';

const reducer = combineReducers({
  auth: authReducer,
  workspace: workspaceReducer, 
  board: boardReducer,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './auth'
