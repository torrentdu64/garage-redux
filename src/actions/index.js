// TODO: add and export your own actions
const BASE_URL = 'https://wagon-garage-api.herokuapp.com';

export function fetchCars(garage) {
  const url = `${BASE_URL}/${garage}/cars`;
  const promise =  fetch(url)
    .then( r => r.to_json());
      return {
        type: 'FETCH_CARS',
        payload: promise
      };
}


export function addCar(garage, car, callback) {
    const url = `${BASE_URL}/${garage}/cars`;
    const request = fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(car)
    }).then(r => r.json())
      .then(() => callback() );

    return {
      type: 'ADD_CAR',
      payload: request
    };
}

export function removeCar(history, car) {
  const url  = `${BASE_URL}/cars/${car.id}`;
  fetch(url , {method: 'DELETE' })
    .then(r => r.json())
    .then(() => history.push(""));
  return {
    type: 'REMOVE_CAR',
    payload: car
  };
}
