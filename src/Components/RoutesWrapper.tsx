import * as React from 'react';
import { RouteInfoState, filteredRoute } from 'src/types';
import * as moment from 'moment';
import { filter, orderBy } from 'lodash-es';
import RouteCard from './RouteCard';
import { Navbar, NavbarBrand, Col, Row, Container} from 'reactstrap';

type RoutesWrapperState = {
  routes: filteredRoute[]
}

export type RoutesWrapperProps = {
  routes: RouteInfoState
}

export default class RoutesWrapper extends React.PureComponent<RoutesWrapperProps, RoutesWrapperState> {

  constructor(props: RoutesWrapperProps) {
    super(props);

    const customRouteObjects = this.getFiltertedRoutes(props.routes);
    const routesSortedByPrice = orderBy(customRouteObjects,'price', 'asc');

    this.state = {
      routes: routesSortedByPrice
    }
  }

  public render () {
    return (
      <>
        {this.renderSubNav()}
        {this.renderCard()}
      </>
    );
  }

  private renderSubNav = () => {
    return (
      <Navbar color='white' expand='sm' className='border-bottom sticky-top'>
        <NavbarBrand className='font-weight-bold'>New York - Montréal: 2nd August, 2019</NavbarBrand>
        <p className='m-0 ml-sm-auto'>{this.state.routes.length > 1 ? this.state.routes.length + ' Results': this.state.routes.length + ' Result'}</p>
      </Navbar>
    );
  };

  private renderCard = () => {
    return (
      <Container>
        <Row>
          <Col sm='12' className='p-0'>
            {this.state.routes.map(route => {
              return <RouteCard key={route.route_id} route={route}/>;
            })}
          </Col>
        </Row>
      </Container>
    );
  };

  // Returns and array of routes that only have the information needed to render UI. 
  private getFiltertedRoutes = (unfilteredRoutes: RouteInfoState) => {
    const filteredRoutes = unfilteredRoutes.departures.map(filteredRoute => ({
      route_id: filteredRoute.id,
      departureTime: moment(filteredRoute.departure_time).format('hh:mm a'),
      departureCity: filter(unfilteredRoutes.cities, ['id', unfilteredRoutes.origin_city_id])[0].full_name,
      departureStation: filter(unfilteredRoutes.locations, ['id', filteredRoute.origin_location_id])[0].name,
      arrivalTime: moment(filteredRoute.arrival_time).format('LLL'),
      arrivalCity: filter(unfilteredRoutes.cities, ['id', unfilteredRoutes.destination_city_id])[0].full_name,
      arrivalStation: filter(unfilteredRoutes.locations, ['id', filteredRoute.destination_location_id])[0].name,
      duration: filteredRoute.duration,
      price: filteredRoute.prices.total,
      currency: filteredRoute.prices.currency,
      logo_url: filter(unfilteredRoutes.operators, ['id', filteredRoute.operator_id])[0].logo_url
    }));

    return filteredRoutes;
  };
};
