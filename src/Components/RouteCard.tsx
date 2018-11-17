import * as React from 'react';
import { filteredRoute } from '../types';
import { Card, Col, Row, CardText, CardFooter, CardBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapPin, faCalendarAlt, faBus } from '@fortawesome/free-solid-svg-icons';

type RouteCardProps = {
  route: filteredRoute,
  key: string
}

export default class RouteCard extends React.PureComponent<RouteCardProps,{}> {

  constructor (props: RouteCardProps) {
    super (props);
  }

  public render () {
    return (
      this.renderRouteCard(this.props.route)
    );
  }
  
  private renderRouteCard = (route: filteredRoute) => {
    return (
      <Card className='m-4'>
        <Row>
          <Col xs='6'>
            <CardBody>
              <CardText className='font-weight-bold'><FontAwesomeIcon icon={faCalendarAlt} className='pr-1'/>{route.departureTime}</CardText>
              <CardText className='text-muted'><FontAwesomeIcon icon={faMapPin} className='pr-1'/>{route.departureStation}</CardText>
            </CardBody>
          </Col>
          <Col xs='6'>
            <CardBody>
              <CardText className='font-weight-bold'><FontAwesomeIcon icon={faCalendarAlt} className='pr-1'/>{route.arrivalTime}</CardText>
              <CardText className='text-muted'><FontAwesomeIcon icon={faMapPin} className='pr-1'/>{route.arrivalStation}</CardText>
            </CardBody>
          </Col>
        </Row>
        <Row>
          <Col xs='12'>
            <CardBody className='pb-0 pt-0'>
              <CardText className='font-weight-bold'><FontAwesomeIcon icon={faBus}/> {(route.duration / 60) | 0}h {route.duration % 60 | 0}m</CardText>
            </CardBody>
          </Col>
        </Row>
        <CardFooter>
          <Row>
            <Col xs='2' className='text-left'>
              <img src={route.logo_url}/>
            </Col>    
            <Col xs='10' className='text-right text-danger'>
              <CardText className='m-0'>{`${route.currency} $${route.price/100}`}</CardText>
              <CardText className='h6'>One Way</CardText>
            </Col>  
          </Row>  
        </CardFooter>
      </Card>
    );
  }

}
