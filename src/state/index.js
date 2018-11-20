import { combineReducers } from 'redux';
import app from './app';
import auth from './auth';
import products from './products';

export default combineReducers({ app, auth, products });
