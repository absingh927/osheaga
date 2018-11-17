import { ReducerMap } from '../helpers';
import { RouteInfoState, Action, Loading, Error, Success, RouteInfoPollPayload } from '../types';
import * as constants from './RoutesConstants';
import { union } from 'lodash-es';

export const handlers: ReducerMap<RouteInfoState> = {
  [constants.ERROR_ROUTES]: (state: RouteInfoState) => {
    return {
      ...state,
      complete: Error
    }
  },
  // updates state for results of full search or partial. Sets complete status accordingly.
  [constants.REQUESTING_ROUTES_STARTED]: (state:RouteInfoState, action: Action<RouteInfoState>) => {
    const currentSearchStatus = action.payload.complete ? Success : Loading;
    return {
      ...state,
      origin_city_id: action.payload.origin_city_id,
      destination_city_id: action.payload.destination_city_id,  
      cities: action.payload.cities,
      departures: action.payload.departures,
      locations: action.payload.locations,
      operators: action.payload.operators,
      complete: currentSearchStatus
    }
  },
  // updates departures, locations, operators and complete from poll search reuslts
  [constants.POLLING_ROUTES]: (state:RouteInfoState, action: Action<RouteInfoPollPayload>) => {
    const pollStatus = action.payload.searchComplete ? Success : Loading;
    return {
      ...state,
      departures: union(state.departures, action.payload.routes.departures),
      locations: union(state.locations, action.payload.routes.locations),
      operators: union(state.operators, action.payload.routes.operators),
      complete: pollStatus
    }
  }
}

export function routes(state: RouteInfoState = constants.RouteDefaultState , action: Action<any>) {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}