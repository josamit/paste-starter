import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  QueryManagerContextProvider,
  QueryParams,
} from "@context/QueryManagerContext";
import {
  emptyQueryParams,
  parseQueryString,
  setQueryParams,
} from "./filtering";

const RouterStateManager: React.FC = ({ children }) => {
  const { search } = useLocation();
  const { push } = useHistory();

  const queryParams = parseQueryString(search || "");
  const newSetQueryParams = (currentPath: string, query: QueryParams) =>
    setQueryParams(push, currentPath, query);
  const newEmptyQueryParams = () => emptyQueryParams(push);

  return (
    <QueryManagerContextProvider
      queryParams={queryParams}
      setQueryParams={newSetQueryParams}
      emptyQueryParams={newEmptyQueryParams}
    >
      {children}
    </QueryManagerContextProvider>
  );
};

export default RouterStateManager;
