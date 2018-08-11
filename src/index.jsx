import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createHistory as history } from 'history';
import { reducer as formReducer } from 'redux-form';

import CarsIndex from './containers/cars_index';
import CarsNew from './containers/cars_new';
import CarsShow from './containers/cars_show';

import '../assets/stylesheets/application.scss';

const garageName = prompt("What is your garage");
const initialState = {
  garage: garageName,
  cars: [],
  form: formReducer
};

import carsReducer from './reducers/cars_reducer.js';

const reducers = combineReducers({
    garage: (state = null , action ) => state,
    cars: carsReducer
});

const middlewares = applyMiddleware(reduxPromise, logger);

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={createStore(reducers, initialState, middlewares)}>
    <Router history={history}>
    <div className="view-container">
      <Switch>
        <Router path="/" exact component={CarsIndex} />
        <Router path="cars/new" exact component={CarsNew} />
        <Router path="cars/:id" component={CarsShow} />
      </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
