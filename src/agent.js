import axios from 'axios'
import commonStore from './stores/commonStore';


//const API_ROOT = 'https://geo-flota-server.herokuapp.com/api/';
const API_ROOT = 'http://localhost:8000/api/';

let requests = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Authorization': `Bearer ${commonStore.token}`
  }
});

const Auth = {
  login: (email, password) => requests.post('/auth/login', {email, password}),
  me: () => requests.get('/me'),
  getUser: (id) => requests.get('/users/' + id),
  all: () => requests.get('/users'),
  create: (user) => requests.post('/users', {...user}),
  delete: (id) => requests.delete('/users/' + id),
  update: (user) => requests.put('/users/' + user.id, {...user})
};

const Company = {
  getCompany: (id) => requests.get('/companies/' + id),
  getCompanyCars: (id) => requests.get('/companies/' + id + '/cars'),
  all: () => requests.get('/companies'),
  create: (name, logo) => requests.post('/companies', {name, logo}),
  delete: (id) => requests.delete('/companies/' + id),
  update: (company) => requests.put('/companies/' + company.id, {...company})
};

const Car = {
  getCar: (id) => requests.get('/cars/' + id),
  getCarLastPosition: (id) => requests.get('/cars/' + id + '/lastposition'),
  all: () => requests.get('/cars'),
  //getAllUserCars: (id) => requests.get('/users/cars'),
  attachCarToUser: (user_id, car_id) => requests.post('/cars/attache-car-to-user', {user_id, car_id}),
  getUserCars: (id) => requests.get('/cars/users/' + id),
  getCarsLastPosition: () => requests.get('/cars/lastposition'),
  create: (car) => requests.post('/cars', {...car}),
  delete: (id) => requests.delete('/cars/' + id),
  update: (car) => requests.put('/cars/' + car.id, {...car})
};

const Tracker = {
  getTracker: (id) => requests.get('/trackers/' + id),
  all: () => requests.get('/trackers'),
  create: (tracker) => requests.post('/trackers', {...tracker}),
  delete: (id) => requests.delete('/trackers/' + id),
  update: (tracker) => requests.put('/trackers/' + tracker.id, {...tracker}),
  ping: (id, position) => requests.get('/trackers/' + id + '/ping', {params: position})
};


export default {
  Auth,
  Company,
  Car,
  Tracker
};
