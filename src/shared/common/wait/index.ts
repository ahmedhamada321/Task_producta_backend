export function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export const retry = async <T>(
  fn: (retriesDone: number) => Promise<T>,
  retries: number = 5,
  delay: number = 1000,
): Promise<T> => {
  try {
    return await fn(retries);
  } catch (error) {
    if (retries <= 0) throw error;
    await wait(delay);
    return retry(fn, retries - 1, delay);
  }
};
