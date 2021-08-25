import { uncaughtOnError, uncaughtError } from '../error/error.js';

uncaughtError(data => {
  console.warn(JSON.stringify(data, null, 2));
})
