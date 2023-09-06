import { Middleware } from 'redux';

const middleware: Middleware = (store) => (next) => (action) => {
  next(action);
};

export default middleware;
