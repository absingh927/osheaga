import { combineReducers } from 'redux';
import { routes } from './Routes/RoutesReducer';

export const rootReducer = combineReducers({
  routes
} as any);