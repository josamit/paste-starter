// Async function to implement a simple sleep. Used in async retrying http calls
export async function Sleep(durationInMs: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(durationInMs), durationInMs);
  });
}
