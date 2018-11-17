export type RouteInfoState = {
    origin_city_id: string,
    destination_city_id: string,
    cities: City[];
    locations: StationLocation[];
    operators: BusOperator[];
    departures: Departures[];
    complete: CallStates; 
};

export type RouteInfoPollPayload = {
    routes: {
        locations: StationLocation[];
        operators: BusOperator[];
        departures: Departures[];
    };
    searchComplete: CallStates;
}

export type City = {
    id: string;
    full_name: string;
};

export type StationLocation = {
    id: string;
    name: string;
};

export type BusOperator = {
    id: string;
    logo_url: string;
};

export type Departures = {
    id: string;
    operator_id: string;
    origin_location_id: number;
    destination_location_id: number;
    departure_time: number;
    arrival_time: number;
    duration: number;
    prices: {
        currency: string;
        total: number;
    }
};

export type filteredRoute =  {
    route_id: string;
    departureTime: string;
    departureCity: string;
    departureStation: string;
    arrivalTime: string;
    arrivalCity: string;
    arrivalStation: string;
    duration: number;
    price: number;
    currency: string,
    logo_url: string
};

export const Loading = 'loading';
export const Success = 'success';
export const Error = 'error';

export type CallStates = typeof Loading | typeof Success | typeof Error;

export type Action<T> = {
    type: string;
    payload: T;
};