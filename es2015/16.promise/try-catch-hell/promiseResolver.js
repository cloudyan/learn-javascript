
// https://dev.to/ovi/callback-hell-or-try-catch-hell-tower-of-terror-5h78

// example 1
async function promiseResolver(promise) {
  try {
    const data = await promise();
    return [data, null];
  } catch (err) {
    return [null, err];
  }
}


// assuming the environment supports direct async function
const [areas, areasErr] = await promiseResolver(getAreas);
const [towns, townsErr] = await promiseResolver(getTowns);
const [cities, citiesErr] = await promiseResolver(getCities);

if (citiesErr) {
  // do something
}

const [countries, countriesErr] = await promiseResolver(getCountries);
const [continents, continentsErr] = await promiseResolver(getContinents);
const [planets, planetsErr] = await promiseResolver(getPlanets);
const [solarSystems, solarSystemsErr] = await promiseResolver(getSolarSystems);
const [galaxies, galaxiesErr] = await promiseResolver(getGalaxies);

if (galaxiesErr) {
  // do something
}

// ... and so on.


// example 2
Promise.all([
  getAreas(),
  getTowns(),
  getCities(),
  getCountries(),
  getContinents(),
  getPlanets(),
  getSolarSystems(),
  getGalaxies()
])
  .then(([
    areas,
    towns,
    cities,
    countries,
    continents,
    planets,
    solarSystems,
    galaxies
  ]) => {
    // Do something here
  })
  .catch(handleError);


// example 3
function getAreas() {}
function getTowns(areas) {}
function getCities(towns) {}
function getCountries(cities) {}

getAreas()
  .then(getTowns)
  .then(getCities)
  .catch(handleError);

// or inline
getAreas()
  .then(function getTowns(areas) {})
  .then(function getCities(towns) {})
  .then(function getCountries(cities) {})
  .catch(function handleError() {});

// example 4
getAreas()
  .then(getTowns)
  .then(getCities)
  .then(getCountries)
  .then(getContinents)
  .then(getPlanets)
  .then(getSolarSystems)
  .then(getGalaxies)
  .catch(handleError);

[
  getAreas,
  getTowns,
  getCities,
  getCountries,
  getContinents,
  getPlanets,
  getSolarSystems,
  getGalaxies
].reduce(
  (previous, promise) => previous.then(promise),
  Promise.resolve()
);

// example 5
const getAPI = async () => {
  try {
    const response = await fetch(API);
    console.log(await response.response.json());
  } catch (error) {
    console.error(error);
  }
};

// vs

const getAPI = () =>
  fetch(API)
    .then(response => response.json())
    .then(console.log)
    .catch(console.error);


// example 6
async function tryAll(promises, name) {
  const resolved = [];
  const rejected = [];
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
  const all = await Promise.allSettled(promises);
  for (const outcome of all)
    if (outcome.hasOwnProperty('value')) resolved.push(outcome.value);
    else rejected.push(outcome.reason);

  if (rejected.length < 1) return resolved;

  const error = new Error('tryAll encountered errors');
  error.name = name;
  error.rejected = rejected;
  throw error;
}

const ERROR_NAME_MULTI_REJECT = 'ErrorMultiReject';

function handleMultiReject(multiError) {
  for (const err of multiError.rejected)
    console.log('Multi Error', err.toString());
}

function routeError(err) {
  if (err.name === ERROR_NAME_MULTI_REJECT) handleMultiReject(err);
  else console.log('Other Error -', err.toString());
}

function makeError(source, name) {
  const error = new Error(`Error from ${source}`);
  error.name = name;
  return error;
}

const testFn = (result, source, name) =>
  result ? Promise.resolve(result) : Promise.reject(makeError(source, name));

async function main() {
  try {
    const one = await testFn('one', `testFnOne`, 'ErrorOne');
    const results = await tryAll(
      [
        testFn(null, `testFnTwo`, 'ErrorTwo'),
        testFn(null, `testFnThree`, 'ErrorThree'),
        testFn('four', `testFnFour`, 'ErrorFour'),
      ],
      ERROR_NAME_MULTI_REJECT
    );
    console.log('done');
  } catch (err) {
    routeError(err);
  }
}

main();
// "Multi Error", "ErrorTwo: Error from testFnTwo"
// "Multi Error", "ErrorThree: Error from testFnThree"


// example 6-2
// wrap the error with one that is uniquely named ...
async function wrapError(promise, name) {
  try {
    // https://jakearchibald.com/2017/await-vs-return-vs-return-await/#return-awaiting
    return await promise;
  } catch (err) {
    const error = new Error('Wrapped Error');
    error.name = name;
    error.wrapped = err;
    throw error;
  }
}

function makeChainedHandler(next, handler) {
  return next
    ? (err) => {
        handler(err);
        next(null);
      }
    : handler;
}

// ... so that the appropriate error handler
// to process the wrapped error can be retrieved
// which calls any other chained "aborted" handlers.
//
function handleError(err) {
  if (err.hasOwnProperty('wrapped')) {
    const handler = handlers.get(err.name);
    if (handler) {
      handler(err.wrapped);
      return;
    }

    err = err.wrapped;
  }

  console.log('Other Error -', err.toString());
}

async function main() {
  try {
    const one = await wrapError(demoFnOne('one'), ERROR_NAME_ONE);
    const two = await wrapError(demoFnTwo(null), ERROR_NAME_TWO);
    const three = await wrapError(demoFnThree('three'), ERROR_NAME_THREE);
    const four = await wrapError(demoFnFour('four'), ERROR_NAME_FOUR);
    console.log('done');
  } catch (err) {
    handleError(err);
  }
}

// --- Begin Demo Support
const DEMO_ONE = 'DemoFnOne';
const DEMO_TWO = 'DemoFnTwo';
const DEMO_THREE = 'DemoFnThree';
const DEMO_FOUR = 'DemoFnFour';

const ERROR_NAME_ONE = 'ErrorOne';
const ERROR_NAME_TWO = 'ErrorTwo';
const ERROR_NAME_THREE = 'ErrorThree';
const ERROR_NAME_FOUR = 'ErrorFour';

const config = [
  [DEMO_ONE, ERROR_NAME_ONE],
  [DEMO_TWO, ERROR_NAME_TWO],
  [DEMO_THREE, ERROR_NAME_THREE],
  [DEMO_FOUR, ERROR_NAME_FOUR],
];

function makeError(fnName) {
  const error = new Error(`Error from ${fnName}`);
  error.name = 'Error' + fnName[0].toUpperCase() + fnName.slice(1);
  return error;
}

const makeDemoFn = (fnName) => (result) =>
  result ? Promise.resolve(result) : Promise.reject(makeError(fnName));

function makeErrorHandler(fnName) {
  return (err) => {
    if (err) {
      console.log(err.toString());
      return;
    }

    console.log(`Error: ${fnName} was aborted.`);
  };
}

function makeBoth([fnName, errName]) {
  const fn = makeDemoFn(fnName);
  const handler = makeErrorHandler(fnName);
  return [
    [fnName, fn],
    [errName, handler],
  ];
}

const [fns, handlers] = (() => {
  const fnEntries = [];
  const handlerEntries = [];
  let chained = null;

  // in reverse to set up the necessary abort chaining
  for (let i = config.length - 1; i >= 0; i -= 1) {
    const [fnEntry, [name, handler]] = makeBoth(config[i]);
    chained = makeChainedHandler(chained, handler);
    fnEntries.push(fnEntry);
    handlerEntries.push([name, chained]);
  }

  return [new Map(fnEntries), new Map(handlerEntries)];
})();

const demoFnOne = fns.get(DEMO_ONE);
const demoFnTwo = fns.get(DEMO_TWO);
const demoFnThree = fns.get(DEMO_THREE);
const demoFnFour = fns.get(DEMO_FOUR);

// --- End Demo Support

main();

// "ErrorDemoFnTwo: Error from DemoFnTwo"
// "Error: DemoFnThree was aborted."
// "Error: DemoFnFour was aborted."
