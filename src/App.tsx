import * as React from 'react';
import logo from './logo.png';
import { AppState } from './AppState';
import { connect } from 'react-redux';
import './index.css';
import { searchRoutes } from './Routes/RoutesActions';
import { CallStates, Loading, Error, Success, RouteInfoState } from './types';
import { Button, Jumbotron, Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import RoutesWrapper from './Components/RoutesWrapper';

type AppComponent = typeof  mapDistpatchToProps & AppComponentMapState;

type AppComponentMapState = {
  searchComplete: CallStates;
  searchResults: RouteInfoState;
};

const mapDistpatchToProps = {
  searchRoutes
};

const mapStateToProps = (store: AppState): AppComponentMapState => ({
  searchComplete: store.routes.complete,
  searchResults: store.routes
});

type AppComponentState = {
  searchStarted: boolean
}

class App extends React.PureComponent<AppComponent, AppComponentState>
{
  constructor(props: AppComponent) {
    super(props);

    this.state = {
      searchStarted: false
    }
  }

  public render() {
    return (
      <>
      {this.renderLanding()}
      {this.renderRoutes()}
      </>
    );
  }

  private searchRoutes = () => {
    // on lcik make call to API to grab routes.
    this.props.searchRoutes();
    this.setState({
      searchStarted: !this.state.searchStarted
    });
  }

  private renderLanding = () => {
    return (
      <Jumbotron fluid className='mb-0'>
        <Container className='text-center'>
          <img src={logo} alt="osheaga-logo" />
          <h4 className='text-center mt-3'>2nd August, 2019</h4>
          <h5>Lets find you some buses to get from NYC to Montréal!</h5>
          <Button color='danger' onClick={this.searchRoutes}>
            <FontAwesomeIcon icon={faSearch}/> Find Me Buses
          </Button>
        </Container>
      </Jumbotron>
    );
  }

  private renderRoutes = () => {
    if (!this.state.searchStarted){
      return (
        <Container>
          <Row>
            <Col xs='12' className='text-center mt-5'>
              <h5>Click Search above to find your routes.</h5>
            </Col>
          </Row>
        </Container>
      );
    }
    return this.renderSearchResults(this.props.searchComplete);
  }

  private renderSearchResults = (searchComplete: CallStates) => {
    // render depending on current status of search.
    if (searchComplete === Loading && this.state.searchStarted) {
      return (
        <Container>
          <Row>
            <Col className='text-center mt-5'>
              <FontAwesomeIcon icon={faSpinner}/>
              <h2>Grabing the best routes for you...</h2>
            </Col>
          </Row>
      </Container>
      );
    } else if (searchComplete === Success) {
      return (
        <RoutesWrapper routes={this.props.searchResults}/>
      );
    } else if (searchComplete === Error) {
      return (
        <Container>
          <Row>
            <Col className='text-center mt-5'>
              <h2>Opps, we were unable to grab you routes. Please refresh the page and try again.</h2>
            </Col>
          </Row>
        </Container>
      );
    }
    return;
  }
}

export default connect(mapStateToProps, mapDistpatchToProps)(App);

