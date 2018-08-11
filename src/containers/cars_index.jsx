import React, {Compenent} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {fetchCars} from '../actions';
import Aside from '../components/aside';

class CarsIndex extends Compenent {

  componentWillMount(){
    this.props.fetchCars(this.props.garage);
  }

  render(){
    if( this.props.cars.length === 0){
      return [
      <Aside key="aside" garage={this.props.garage} >
        <Link to='/cars/new'>Add a new car</Link>
      </Aside>,
        <div className="no-car">No car yet</div>
      ];
    }
    return [
      <Aside key="aside" garage={this.props.garage} >
        <Link to='/cars/new'> add a car </Link>
      </Aside>,
      <div className="list-container" key='car'>
        {this.props.cars.map( (car) => {
          return (
            <div key={car.id} className="car-smallad">
              <Link to={`/cars/${car.id}`} key={car.id} />
                <img src="assets/images/logo_square.svg" className="car-logo" />
                <div className="car-details">
                  <span>{car.brand} {car.model}</span>
                  <ul>
                      <li><strong>Owner:</strong>{car.owner}</li>
                  </ul>
                </div>
            </div>
            );
        })}
      </div>
      ];
    }
  };

 function mapStateToProps(state){
  return {
    cars: state.cars,
    garage: state.garage
  };
 }

 function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCars }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps )(CarsIndex);
