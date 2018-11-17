import { RouteInfoState, Loading } from '../types';

export const REQUESTING_ROUTES_STARTED = 'EQUESTING_ROUTES_STARTED';
export const SUCCESS_ROUTES = 'SUCCESS_ROUTES';
export const ERROR_ROUTES = 'ERROR_ROUTES';
export const POLLING_ROUTES = 'POLLING_ROUTES';

export const RouteDefaultState: RouteInfoState = {
	origin_city_id: '',
	destination_city_id: '',
	cities: [],
	locations: [],
	operators: [],
	departures: [],
	complete: Loading
}

export const SEARCH_URL = 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2019-08-02?adult=1';
export const SEARCH_URL_POLL = 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2019-08-02/poll?adult=1';
export const SEARCH_URL_HEADERS = {
	headers: {
		Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
		'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
	}
};