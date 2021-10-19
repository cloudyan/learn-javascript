import { uncaughtOnError, uncaughtError } from '../error/onerror.js';

uncaughtOnError(data => {
  console.warn(JSON.stringify(data, null, 2));
})
