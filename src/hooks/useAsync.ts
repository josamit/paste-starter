import { useCallback, useEffect, useState } from "react";

export type AsyncInitialState = {
  isInitial: true;
  isLoading: false;
  isSuccess: false;
  isFailed: false;
  isFinished: false;
};

export type AsyncLoadingState = {
  isInitial: false;
  isLoading: true;
  isSuccess: false;
  isFailed: false;
  isFinished: false;
};

export type AsyncSuccessState<T> = {
  data: T;
  isInitial: false;
  isLoading: false;
  isSuccess: true;
  isFailed: false;
  isFinished: true;
};

export type AsyncFailedState<E> = {
  isInitial: false;
  isLoading: false;
  isSuccess: false;
  isFailed: true;
  isFinished: true;
  error: E;
};

export type AsyncState<T, E = Error> =
  | AsyncSuccessState<T>
  | AsyncFailedState<E>
  | AsyncLoadingState
  | AsyncInitialState;

export function getInitialState(): AsyncInitialState {
  return {
    isLoading: false,
    isSuccess: false,
    isFailed: false,
    isFinished: false,
    isInitial: true,
  };
}

export function getLoadingState(): AsyncLoadingState {
  return {
    isLoading: true,
    isSuccess: false,
    isFailed: false,
    isFinished: false,
    isInitial: false,
  };
}

export function getSuccessState<T>(data: T): AsyncSuccessState<T> {
  return {
    data,
    isLoading: false,
    isSuccess: true,
    isFailed: false,
    isFinished: true,
    isInitial: false,
  };
}

export function getFailedState<E>(error: E): AsyncFailedState<E> {
  return {
    isLoading: false,
    isSuccess: false,
    isFailed: true,
    error,
    isFinished: true,
    isInitial: false,
  };
}

export type UseAsyncReturn<T, E = Error> = AsyncState<T, E> & {
  request: () => Promise<T | E>;
};

export type UseAsyncConfig = {
  fireRequest?: boolean;
};

/**
 * Make sure to useCallback when passing asyncCreator to this function so it wouldn't rerender every time.
 * @param asyncCreator
 * @param config
 */
export function useAsync<T, E = Error>(
  asyncCreator: () => Promise<T>,
  { fireRequest = true }: UseAsyncConfig = {}
): UseAsyncReturn<T, E> {
  const [state, setState] = useState<AsyncState<T, E>>(getInitialState);

  const request = useCallback(async () => {
    setState(getLoadingState);

    try {
      const results = await asyncCreator();
      setState(getSuccessState(results));

      return results;
    } catch (e: any) {
      console.error("error", e);
      setState(getFailedState(e));

      return e;
    }
  }, [asyncCreator]);

  useEffect(() => {
    if (fireRequest !== false) {
      request();
    }
  }, [fireRequest, request]);

  return {
    ...state,
    request,
  };
}
