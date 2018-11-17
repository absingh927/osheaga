import * as constants from './RoutesConstants';
import { Dispatch } from 'redux';
import axios from 'axios';
import { AppState } from 'src/AppState';
import { Success } from '../types';

export const searchRoutes = () => {
  return (dispatch: Dispatch, getState: () => AppState) => {
    axios.get(constants.SEARCH_URL, constants.SEARCH_URL_HEADERS)
      .then(routes => {

        // dispatch intial response from API, partial reuslts or full.
        dispatch({
          type: constants.REQUESTING_ROUTES_STARTED,
          payload: routes.data
        });

        // call Poll Search if response said it was not finished.
        // timer calls search every 4 seconds, until search is finished.
        if (!routes.data.complete) {
          const timer = setInterval(() => {
            pollSearch(dispatch, getState)
              .then(() => {
                const { routes } = getState();
                if (routes.complete === Success) {
                  clearInterval(timer);
                }
              })
          }, 4000);
        }
         
      })
      .catch(error => {
        console.error(error);
        dispatch({
          type: constants.ERROR_ROUTES,
          payload: error
        })
      })
  };
};

export const pollSearch = (dispatch: Dispatch, getState: () => AppState) => {
  const { routes } = getState();

  return axios.get(`${constants.SEARCH_URL_POLL}&index=${routes.departures.length}`, constants.SEARCH_URL_HEADERS)
    .then(routes => {

      // dispatch reuslts of search and if search has finished to update state.
      dispatch({
        type: constants.POLLING_ROUTES,
        payload: {
          routes: routes.data,
          searchComplete: routes.data.complete
        }
      });
    });
};