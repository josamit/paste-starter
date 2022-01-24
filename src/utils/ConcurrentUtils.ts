/*
 * takes an array of items and a function that accepts an item at a time and returns a promise
 * returns a promise that resolves to an array of results
 */
export function mapConcurrent<T>(
  items: string | any[],
  maxConcurrent: number,
  fn: (arg0: T, arg1: number) => Promise<any>
) {
  let index = 0;
  let currentlyInFlightRequests = 0;
  let completedRequests = 0;
  const results = new Array(items.length);
  let stopExecution = false;

  return new Promise(function (resolve, reject) {
    function run() {
      // launch as many as we're allowed to
      while (
        !stopExecution &&
        currentlyInFlightRequests < maxConcurrent &&
        index < items.length
      ) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        runNext();
      }
      // if all are done, then resolve parent promise with results
      if (completedRequests === items.length) {
        resolve(results);
      }
    }

    function runNext() {
      const i = index;
      // eslint-disable-next-line no-plusplus
      ++currentlyInFlightRequests;
      // eslint-disable-next-line no-plusplus
      fn(items[index], index++).then(
        function (val) {
          // eslint-disable-next-line no-plusplus
          ++completedRequests;
          // eslint-disable-next-line no-plusplus
          --currentlyInFlightRequests;
          results[i] = val;
          run();
        },
        function (err) {
          // set flag so we don't launch any more requests
          stopExecution = true;
          reject(err);
        }
      );
    }

    run();
  });
}
