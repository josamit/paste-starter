import React, { useContext } from "react";
import { noop } from "../utils/misc";

export type QueryParams = {
  accountSid?: string;
  activeTab?: string;
};

interface Props {
  queryParams: QueryParams;

  setQueryParams(currentpath: string, query: QueryParams): void;

  emptyQueryParams(): void;
}

export type QueryManagerContextType = Props;

export const QueryManagerContext = React.createContext<QueryManagerContextType>(
  {
    queryParams: {},
    setQueryParams: noop,
    emptyQueryParams: noop,
  }
);

export function useQueryManager() {
  return useContext(QueryManagerContext);
}

export function getMockQueryManager(
  queryManagerProps: Partial<QueryManagerContextType> = {}
): QueryManagerContextType {
  return {
    queryParams: {},
    setQueryParams: noop,
    emptyQueryParams: noop,
    ...queryManagerProps,
  };
}

export const MockQueryManagerContext: React.FC<{
  value?: Partial<QueryManagerContextType>;
}> = ({ value, children }) => {
  return (
    <QueryManagerContext.Provider value={getMockQueryManager(value)}>
      {children}
    </QueryManagerContext.Provider>
  );
};

export const QueryManagerContextProvider: React.FC<QueryManagerContextType> = ({
  queryParams,
  setQueryParams,
  emptyQueryParams,
  children,
}) => {
  return (
    <QueryManagerContext.Provider
      value={{
        queryParams,
        setQueryParams: (currentPath, query) => {
          setQueryParams(currentPath, query);
        },
        emptyQueryParams: () => {
          emptyQueryParams();
        },
      }}
    >
      {children}
    </QueryManagerContext.Provider>
  );
};
